import React from "react";
import image from "../../images/logo.png";
import "./general-auth-box.scss";

interface GeneralAuthProps {
  childComponent: React.ReactNode;
}

const GeneralAuthComponent: React.FC<GeneralAuthProps> = (props) => {
  return (
    <div className="d-flex justify-content-center  general-auth-component">
      <div className="elevation-3 my-3 rounded-4 auth-box">
        <img className="app-logo mt-2" src={image} alt="Logo de l'app" />
        {props.childComponent}
      </div>
    </div>
  );
};

export default GeneralAuthComponent;
