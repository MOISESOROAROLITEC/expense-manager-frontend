import { Outlet } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="mainScreen custom-scroll">
          <Outlet />
        </div>
      </LocalizationProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
