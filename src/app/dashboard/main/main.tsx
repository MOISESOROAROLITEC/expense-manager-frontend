import React, { useEffect, useState } from "react";
import Navigation from "../nav/navigation";
import { Header } from "../header/header";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import "./main.scss";
import Axios from "../../shared/utilities/axios";
import { GetUserByTokenResponse } from "../../shared/user-interface/interface";
import { getUserByTokenGraphQLRequest } from "../../shared/utilities/graphql-request";
import { showAuthResponseError } from "../../auth/auth.service";
import { setFirstName, setInitial, updateUser } from "../../store/user/slice";
import { useAppDispatch } from "../../store/user/hooks";
import { AxiosError } from "axios";
import { toastUnknowServerError } from "../../shared/toast/toast";
import { Saving } from "../saving/saving";

const Dashboard: React.FC = () => {
  document.title = "Tableau de bord";
  const dispatch = useAppDispatch();
  const [showNav, setShowNav] = useState(true);
  const history = useHistory();

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
            history.push("/login");
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
      history.push("/login");
    }
  }, [history, dispatch]);

  return (
    <div className="row m-0 p-0 dashboard">
      <Router>
        <div className={"left-element"}>
          <Navigation />
        </div>
        <div className="p-0 right-element">
          <div className="dashboard-header">
            <Header showNav={showNav} setShowNav={setShowNav} />
          </div>
          <div className="dashboard-content">
            <Switch>
              <Route exact path={["/dashboard", "/dashboard/saving"]}>
                <Saving />
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
