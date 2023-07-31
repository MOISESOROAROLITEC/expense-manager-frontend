import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import RegisterComponent from "./app/auth/register/register-component";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { ToastContainer } from "react-toastify";
import GeneralAuthComponent from "./app/auth/general-auth-box/general-auth-box";
import LoginComponent from "./app/auth/login/login-component";
import Dashboard from "./app/dashboard/main/main";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="mainScreen">
            <Switch>
              <Route exact path={["/", "/sign-up"]}>
                {localStorage.getItem("token") ? (
                  <Redirect to={"/dashboard"} />
                ) : (
                  <GeneralAuthComponent
                    title="Inscription"
                    childComponent={
                      <RegisterComponent title="Page d'inscription" />
                    }
                  />
                )}
              </Route>

              <Route exact path={"/login"}>
                {localStorage.getItem("token") ? (
                  <Redirect to={"/dashboard"} />
                ) : (
                  <GeneralAuthComponent
                    title="Connexion"
                    childComponent={<LoginComponent />}
                  />
                )}
              </Route>
              <Route path={"/dashboard"}>
                {localStorage.getItem("token") ? (
                  <Dashboard />
                ) : (
                  <Redirect to={"/dashboard"} />
                )}
              </Route>
              <Route path={"/*"}>
                <GeneralAuthComponent
                  title="Page not found"
                  authBoxElevation={3}
                  childComponent={
                    <>
                      <Link to={"/"} title="Page d'acceil">
                        Revenir à la page d'acceuil
                      </Link>
                    </>
                  }
                />
              </Route>
            </Switch>
          </div>
        </LocalizationProvider>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
