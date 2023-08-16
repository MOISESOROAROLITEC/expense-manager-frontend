import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../../images/logo.png";
import "./general-auth-box.scss";

interface GeneralAuthProps {
  title: string;
  childComponent: React.ReactNode;
  authBoxElevation?: number;
}

const GeneralAuthComponent: React.FC<GeneralAuthProps> = ({
  authBoxElevation = 3,
  ...props
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center  general-auth-component ">
      <div
        className={
          "elevation-" +
          authBoxElevation +
          " p-4 my-3 rounded-4 auth-box custom-scroll"
        }
      >
        <img className="app-logo mb-2" src={image} alt="Logo de l'app" />
        <h3 className="auth-title">{props.title}</h3>
        {props.childComponent}
      </div>
    </div>
  );
};

export default GeneralAuthComponent;
