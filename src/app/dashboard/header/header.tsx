import React from "react";
import "./header.scss";

export const Header: React.FC = () => {
  return (
    <div className="rounded-4 elevation-1 d-flex justify-content-between w-100 green-1 header">
      <span className="d-block cursor-pointer d-md-none material-symbols-rounded menu-show-navigation">
        menu
      </span>
      <div className="app-name">Save money</div>
      <div className="user-block">user</div>
    </div>
  );
};
