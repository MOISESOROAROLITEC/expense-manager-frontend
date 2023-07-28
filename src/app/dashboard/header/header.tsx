import React from "react";
import "./header.scss";

export const Header: React.FC = () => {
  return (
    <div className="rounded-4 elevation-1 d-flex justify-content-between align-items-center w-100 green-1 header">
      <span className="d-block cursor-pointer d-md-none material-symbols-rounded menu-show-navigation">
        menu
      </span>
      <div className="app-name-slogan">
        <h5 className="text-center app-name">Save Money</h5>
        <h6 className="text-center app-slogan">Eparger pour mieux investire</h6>
      </div>
      <div className="user-block">user</div>
    </div>
  );
};
