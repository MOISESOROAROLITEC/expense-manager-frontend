import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Outlet, redirect } from "react-router-dom";
import Navigation from "../components/nav/navigation";
import { Header } from "../components/header/header";
import Axios from "../../shared/utilities/axios";
import { GetUserByTokenResponse } from "../../shared/user-interface/interface";
import { getUserByTokenGraphQLRequest } from "../../shared/utilities/graphql-request";
import { showAuthResponseError } from "../../auth/auth.service";
import { setFirstName, setInitial, updateUser } from "../../store/user/slice";
import { useAppDispatch } from "../../store/user/hooks";
import { toastUnknowServerError } from "../../shared/toast/toast";

import "./main.scss";

const Dashboard: React.FC = () => {
  document.title = "Tableau de bord";
  const dispatch = useAppDispatch();
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      Axios.post<GetUserByTokenResponse>(
        "",
        getUserByTokenGraphQLRequest(token)
      )
        .then((res) => {
          if (!res.data.data) {
            showAuthResponseError(res);
            redirect("/login");
          } else {
            dispatch(updateUser(res.data.data.getUserByToken));
            dispatch(setInitial(res.data.data.getUserByToken.name));
            dispatch(setFirstName(res.data.data.getUserByToken.name));
          }
        })
        .catch((err) => {
          if (
            err instanceof AxiosError<GetUserByTokenResponse> &&
            err.response
          ) {
            showAuthResponseError(err.response);
          } else {
            toastUnknowServerError();
          }
        });
    } else {
      redirect("/login");
    }
  }, [dispatch]);

  return (
    <div className="row m-0 p-0 dashboard">
      <div className={"left-element"}>
        <Navigation />
      </div>
      <div className="p-0 right-element">
        <div className="dashboard-header">
          <Header showNav={showNav} setShowNav={setShowNav} />
        </div>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
      <div
        id="scrolableDialog"
        className="modal-dialog modal-dialog-scrollable"
      >
        {" "}
        Le modal scrolable très long...{" "}
      </div>

      <button
        className="btn btn-primary d-flex align-items-center justify-content-center elevation-0 add-btn"
        data-bs-placement="auto"
        data-bs-title="Faire une operation"
        data-bs-for="scrolableDialog"
      >
        <span className="material-symbols-rounded">add</span>
      </button>
    </div>
  );
};

export default Dashboard;
