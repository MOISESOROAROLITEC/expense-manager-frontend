import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterComponent from "./auth/register/register-component";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import GeneralAuthComponent from "./auth/general-auth-box/general-auth-box";
import LoginComponent from "./auth/login/login-component";

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <div className="mainScreen">
            <Switch>
              <Route exact path={"/"}>
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
            </Switch>
          </div>
        </Router>
      </LocalizationProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
