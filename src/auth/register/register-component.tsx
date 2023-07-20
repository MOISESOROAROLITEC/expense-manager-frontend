import { useState } from "react";
import image from "../../images/logo.png";
import "./register-component.scss";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import { CircularProgress } from "@mui/material";
import Axios from "../../shared/utilities/axios";
import { registerUser } from "../../shared/utilities/graphql-request";
import { User, userDataResponse } from "../../shared/user-interface/interface";
import { toastError, toastSucces } from "../../shared/toast/toast";
import { formatDate } from "../../shared/utilities/format-date";
import { Redirect } from "react-router-dom";

export default function RegisterComponent(props: { title: string }) {
  document.title = props.title;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState(dayjs(new Date()));
  const [doRequest, setDoRequest] = useState(false);
  const [registred, setRegistred] = useState(false);

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
      const response = await Axios.post<userDataResponse>(
        "",
        registerUser(userData)
      );

      if (response.status === 200) {
        if (!response.data.data) {
          toastError(response.data.errors[0].message);
        } else {
          toastSucces("Compte créée avec succès");
          toastSucces("Veillez vous connecter");
          setRegistred(true);
        }
      }

      setDoRequest(false);
    } catch (error) {
      setDoRequest(false);
    }
  };
  return (
    <>
      <div className="d-flex justify-content-center register-component">
        <form
          className="elevation rounded-3 p-4 my-4 register-form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <img className="app-logo mb-2" src={image} alt="" />
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
          <div className="d-flex align-items-center justify-content-center btn-and-spiner">
            <button className="btn w-100 btn-primary btn-lg" type="submit">
              S'inscrire
            </button>
            {doRequest && (
              <CircularProgress
                className="mx-2"
                size={"45px"}
                color="primary"
              />
            )}
          </div>
        </form>
        {registred && <Redirect to={"/login"} />}
      </div>
    </>
  );
}
