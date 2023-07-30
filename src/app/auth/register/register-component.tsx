import dayjs, { Dayjs } from "dayjs";
import React, { ChangeEvent, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { AxiosError } from "axios";

import Axios from "../../shared/utilities/axios";
import SubmitButton from "../../shared-components/submit-button";
import { formatDate } from "../../shared/utilities/format-date";

import { registerUserGraphQLRequest } from "../../shared/utilities/graphql-request";
import {
  User,
  UserRegisterError,
  UserRegisterResponse,
} from "../../shared/user-interface/interface";
import {
  dismisToasts,
  toastSucces,
  toastUnknowServerError,
} from "../../shared/toast/toast";
import "./register-component.scss";
import { showAuthResponseError } from "../auth.service";

const RegisterComponent: React.FC<{ title: string }> = (props) => {
  document.title = "Inscription";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));
  const [doRequest, setDoRequest] = useState(false);
  const [registred, setRegistred] = useState(false);
  const [image, setImage] = useState("");

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const imageToSend =
        (await e.target.files[0].arrayBuffer()) as unknown as string;
      setImage(imageToSend);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDoRequest(true);
    const userData: User = {
      name,
      email,
      password,
      birthDay: formatDate(date.toString()),
      image,
    };
    try {
      const response = await Axios.post<UserRegisterResponse>(
        "",
        registerUserGraphQLRequest(userData)
      );

      if (response.status === 200 && response.data.data) {
        dismisToasts();
        setTimeout(() => toastSucces("Compte créée avec succès"), 100);
        setTimeout(() => toastSucces("Veillez vous connecter"), 1000);
        setRegistred(true);
      } else {
        showAuthResponseError(response);
      }
    } catch (error) {
      if (error instanceof AxiosError<UserRegisterError> && error.response) {
        showAuthResponseError(error.response);
      } else {
        toastUnknowServerError();
      }
    }
    setDoRequest(false);
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
      <SubmitButton text="S'inscrire" loading={doRequest} />
      <div className="auth-bottom-link">
        Vous avez déjà un compte ? <Link to={"/login"}> Se connecter </Link>
      </div>
      {registred && <Redirect to={"/login"} />}
    </form>
  );
};

export default RegisterComponent;
