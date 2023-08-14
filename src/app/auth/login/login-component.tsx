import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../../shared-components/submit-button";
import {
  LoginData,
  UserLoginResponse,
} from "../../shared/interfaces/user-interfaces";
import { loginUserGraphQL } from "../../shared/utilities/graphql-request";
import { toastUnknowServerError } from "../../shared/toast/toast";
import { dismisToasts } from "../../shared/toast/toast";
import { catchRequestError } from "../auth.service";

const LoginComponent: React.FC = () => {
  document.title = "Connexion";
  const { register, handleSubmit } = useForm<LoginData>();
  const navigate = useNavigate();
  const [onLoginUser, { loading }] =
    useMutation<UserLoginResponse>(loginUserGraphQL);

  async function onSubmit(loginData: LoginData) {
    try {
      const user = await onLoginUser({
        variables: {
          email: loginData.email,
          password: loginData.password,
        },
        fetchPolicy: "no-cache",
      });
      if (user.data?.loginUser.token) {
        localStorage.setItem("token", user.data.loginUser.token);
        dismisToasts();
        return navigate("/dashboard");
      } else {
        toastUnknowServerError();
      }
    } catch (error) {
      catchRequestError(error);
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
      <SubmitButton text="Se connecter" loading={loading} />
      <div className="auth-bottom-link">
        Vous n'avez pas encore de compte ?{" "}
        <Link to={"/sign-up"}> Créer un compte </Link>
      </div>
    </form>
  );
};

export default LoginComponent;
