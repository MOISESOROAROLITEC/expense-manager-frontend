import dayjs, { Dayjs } from "dayjs";
import React, { ChangeEvent, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { AxiosError } from "axios";

import Axios from "../../shared/utilities/axios";
import SubmitButton from "../../shared-components/submit-button";
import { formatDate } from "../../shared/utilities/format-date";

import {
  registerUserGraphQLRequest,
  uploadUserImageGraphQLRequest,
} from "../../shared/utilities/graphql-request";
import {
  User,
  UserRegisterError,
  UserRegisterResponse,
} from "../../shared/user-interface/interface";
import {
  dismisToasts,
  toastError,
  toastSucces,
} from "../../shared/toast/toast";
import "./register-component.scss";

const RegisterComponent: React.FC<{ title: string }> = (props) => {
  document.title = props.title;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));
  const [doRequest, setDoRequest] = useState(false);
  const [registred, setRegistred] = useState(false);
  const [image, setImage] = useState<File>();

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
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
    };
    try {
      const response = await Axios.post<UserRegisterResponse>(
        "",
        registerUserGraphQLRequest(userData)
      );

      if (response.status === 200) {
        if (!response.data.data) {
          console.log("le tout : ", response.data.errors);
          response.data.errors.forEach((error) => {
            console.log("##########", error.message);
            toastError(error.message);
            if (error.extensions.originalError) {
              error.extensions.originalError.message.map((el: string) =>
                toastError(el)
              );
            }
          });
        } else {
          if (response.data.data.createUser.id) {
            if (image) {
              console.log("je suis dans if image et l'image est : ", image);
              const uploadImageResponse = await Axios.post<{ status: boolean }>(
                "",
                uploadUserImageGraphQLRequest(
                  image,
                  response.data.data.createUser.id
                )
              );
              console.log("erreur de upload image : ", uploadImageResponse);
            }
            dismisToasts();
            setTimeout(() => toastSucces("Compte créée avec succès"), 100);
            setTimeout(() => toastSucces("Veillez vous connecter"), 1000);
            setRegistred(true);
          }
        }
      }

      setDoRequest(false);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError<UserRegisterError> && error.response) {
        error.response.data.errors.foreach((error: { message: string }) => {
          toastError(error.message);
        });
        setDoRequest(false);

        return;
      }
      toastError("Une erreur inconue s'est produite");
      setDoRequest(false);
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
            />
          </div>
        </div>
      </div>
      <SubmitButton text="S'inscrire" loading={doRequest} />
      <div className="auth-bottom-link">
        Vous avez déjà un compte ? <Link to={"/login"}> Se connecter </Link>
      </div>
      {registred && <Redirect to={"/login"} />}
    </form>
  );
};

export default RegisterComponent;
