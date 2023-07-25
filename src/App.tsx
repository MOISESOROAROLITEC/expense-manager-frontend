import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import RegisterComponent from "./app/auth/register/register-component";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import GeneralAuthComponent from "./app/auth/general-auth-box/general-auth-box";
import LoginComponent from "./app/auth/login/login-component";

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <div className="mainScreen">
            <Switch>
              <Route exact path={["/", "/sign-up"]}>
                <GeneralAuthComponent
                  title="Inscription"
                  childComponent={
                    <RegisterComponent title="Page d'inscription" />
                  }
                />
              </Route>
              <Route exact path={"/login"}>
                <GeneralAuthComponent
                  title="Connection"
                  childComponent={<LoginComponent />}
                />
              </Route>
              <Route exact path={"/dashboard"}>
                <GeneralAuthComponent
                  title="Connection"
                  authBoxElevation={1}
                  childComponent={<h1>Je suis sur le dash borad</h1>}
                />
              </Route>
              <Route path={"/*"}>
                <GeneralAuthComponent
                  title="Page not found"
                  authBoxElevation={1}
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
        </Router>
      </LocalizationProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
