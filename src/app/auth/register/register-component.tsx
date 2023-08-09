import dayjs, { Dayjs } from "dayjs";
import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import SubmitButton from "../../shared-components/submit-button";
import { formatDate } from "../../shared/utilities/format-date";
import { registerUserGraphQL } from "../../shared/utilities/graphql-request";
import {
  User,
  UserRegisterResponse,
} from "../../shared/interfaces/user-interfaces";
import { dismisToasts, toastUnknowServerError } from "../../shared/toast/toast";
import "./register-component.scss";
import { catchRequestError } from "../auth.service";
import { useMutation } from "@apollo/client";

const RegisterComponent: React.FC<{ title: string }> = (props) => {
  document.title = "Inscription";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [registerUser, { loading }] =
    useMutation<UserRegisterResponse>(registerUserGraphQL);

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageToSend =
        (await e.target.files[0].arrayBuffer()) as unknown as string;
      setImage(imageToSend);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData: User = {
      name,
      email,
      password,
      birthDay: formatDate(date.toString()),
      amount: 0,
      target: 0,
      image,
    };
    try {
      const user = await registerUser({
        variables: {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          birthDay: userData.birthDay,
          image: userData.image,
        },
      });
      if (user.data?.createUser.token) {
        localStorage.setItem("token", user.data.createUser.token);
        dismisToasts();
        return navigate("/dashboard");
      } else {
        toastUnknowServerError();
      }
    } catch (error) {
      catchRequestError(error);
    }
  };

  return (
    <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
      <div className="inputs-block">
        <div className="input-block">
          <label className="form-label" htmlFor="name">
            Nom
          </label>
          <input
            className="form-control form-control-lg"
            minLength={3}
            maxLength={50}
            name="name"
            id="name"
            type="text"
            required
            placeholder="Entrez votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control form-control-lg"
            name="email"
            id="email"
            type="email"
            required
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label className="form-label" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="form-control form-control-lg"
            name="password"
            id="password"
            minLength={8}
            maxLength={50}
            type="password"
            required
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-block">
          <label className="form-label" htmlFor="birthday">
            Date de naissance
          </label>
          <DatePicker
            onChange={(value) => setDate(value as Dayjs)}
            value={date}
            className="form-control"
          />
        </div>
      </div>
      {false && (
        <div className="input-block">
          <label className="form-label" htmlFor="image">
            Photo
          </label>
          <div className="input-group input-group-lg mb-3">
            <input
              required
              onChange={(e) => handleChangeImage(e)}
              type="file"
              multiple={false}
              className="form-control"
              id="image"
              accept="image/*"
            />
          </div>
        </div>
      )}
      <SubmitButton text="S'inscrire" loading={loading} />
      <div className="auth-bottom-link">
        Vous avez déjà un compte ? <Link to={"/login"}> Se connecter </Link>
      </div>
    </form>
  );
};

export default RegisterComponent;
