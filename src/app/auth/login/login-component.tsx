import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../../shared-components/submit-button";
import Axios from "../../shared/utilities/axios";
import {
  LoginData,
  UserLoginResponse,
} from "../../shared/user-interface/interface";
import { loginUserGraphQLRequest } from "../../shared/utilities/graphql-request";
import { toastError } from "../../shared/toast/toast";
import { Link, redirect } from "react-router-dom";
import { dismisToasts } from "../../shared/toast/toast";
import { useAppDispatch } from "../../store/user/hooks";
import { updateUser } from "../../store/user/slice";

const LoginComponent: React.FC = () => {
  document.title = "Connexion";
  const [isDoRequest, setIsDoRequest] = useState(false);
  const { register, handleSubmit } = useForm<LoginData>();
  const dispatch = useAppDispatch();

  async function onSubmit(loginData: LoginData) {
    try {
      setIsDoRequest(true);
      const response = await Axios.post<UserLoginResponse>(
        "",
        loginUserGraphQLRequest(loginData)
      );
      if (response.status === 200) {
        if (!response.data.data) {
          toastError(response.data.errors[0].message);
        } else {
          dismisToasts();
          const userData = response.data.data.loginUser;
          if (userData.token) localStorage.setItem("token", userData.token);
          dispatch(updateUser(userData));
          redirect("/dashboard");
        }
      }
      setIsDoRequest(false);
    } catch (error) {
      setIsDoRequest(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-block">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          className="form-control form-control-lg"
          id="email"
          type="email"
          required
          placeholder="Entrez votre email"
          {...register("email", { required: true })}
        />
      </div>
      <div className="input-block">
        <label className="form-label" htmlFor="password">
          Mot de passe
        </label>
        <input
          className="form-control form-control-lg"
          id="password"
          minLength={8}
          maxLength={50}
          type="password"
          required
          placeholder="Entrez votre mot de passe"
          {...register("password", { required: true, minLength: 8 })}
        />
      </div>
      <SubmitButton text="Se connecter" loading={isDoRequest} />
      <div className="auth-bottom-link">
        Vous n'avez pas encore de compte ?{" "}
        <Link to={"/sign-up"}> Créer un compte </Link>
      </div>
    </form>
  );
};

export default LoginComponent;
