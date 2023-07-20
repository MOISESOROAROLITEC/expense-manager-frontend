import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RegisterComponent from "./auth/register/register-component";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <div className="mainScreen">
            <Switch>
              <Route exact path={"/"}>
                <RegisterComponent title="Page d'inscription" />
              </Route>
              <Route exact path={"/login"}>
                <RegisterComponent title="Page de connection" />
              </Route>
            </Switch>
          </div>
        </Router>
      </LocalizationProvider>
    </div>
  );
}

export default App;
