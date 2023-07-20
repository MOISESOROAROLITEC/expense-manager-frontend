import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterComponent from "./auth/register/register-component";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import GeneralAuthComponent from "./auth/general-auth-box/general-auth-box";

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <div className="mainScreen">
            <Switch>
              <Route exact path={"/"}>
                <GeneralAuthComponent
                  childComponent={
                    <RegisterComponent title="Page d'inscription" />
                  }
                />
              </Route>
              <Route exact path={"/login"}>
                <h1>Page de connection</h1>
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
