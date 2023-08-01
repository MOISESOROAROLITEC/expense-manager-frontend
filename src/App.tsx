import { BrowserRouter, Route, Link } from "react-router-dom";
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
            <Route path={"/sign-up"}>
              {localStorage.getItem("token") ? (
                <h3>L'utilisateur n'est pas connecté</h3>
              ) : (
                <GeneralAuthComponent
                  title="Inscription"
                  childComponent={
                    <RegisterComponent title="Page d'inscription" />
                  }
                />
              )}
            </Route>

            <Route path={"/login"}>
              {localStorage.getItem("token") ? (
                <h3>L'utilisateur n'est pas connecté</h3>
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
                <h3>L'utilisateur n'est pas connecté</h3>
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
          </div>
        </LocalizationProvider>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
