import React, { useEffect, useState } from "react";
import Navigation from "../nav/navigation";
import { Header } from "../header/header";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./main.scss";
import Axios from "../../shared/utilities/axios";
import { GetUserByTokenResponse } from "../../shared/user-interface/interface";
import { getUserByTokenGraphQLRequest } from "../../shared/utilities/graphql-request";
import { showAuthResponseError } from "../../auth/auth.service";
import { updateUser } from "../../store/user/slice";
import { useAppDispatch } from "../../store/user/hooks";
import { AxiosError } from "axios";
import { toastUnknowServerError } from "../../shared/toast/toast";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isTokenValide, setIsTokenValide] = useState(true);
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
            setIsTokenValide(false);
          } else {
            dispatch(updateUser(res.data.data.getUserByToken));
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
          setIsTokenValide(false);
        });
    }
  });

  return (
    <div className="row m-0 p-0 dashboard">
      {!isTokenValide && <Redirect to={"/login"} />}
      <Router>
        <div className="left-element d-none d-md-block">
          <Navigation />
        </div>
        <div className="p-0 right-element">
          <div className="dashboard-header">
            <Header />
          </div>
          <div className="dashboard-content">
            <Switch>
              <Route exact path={["/dashboard", "/dashboard/saving"]}>
                <h1>page par defaut</h1>
              </Route>
              <Route exact path={"/dashboard/transactions"}>
                <h1>historique</h1>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default Dashboard;
