import React from "react";
import logo from "../../../images/logo.png";
import "./navigation.scss";
import { Link } from "react-router-dom";

interface navOptions {
  text: string;
  href: string;
  icon: string;
}

const Navigation: React.FC = () => {
  const options: navOptions[] = [
    {
      text: "Epargne",
      href: "/dashboard/saving",
      icon: "payments",
    },
    {
      text: "Historique des transactions",
      href: "/dashboard/transactions",
      icon: "history",
    },
    {
      text: "Progression collective",
      href: "/dashboard/colective-progression",
      icon: "bar_chart_4_bars",
    },
    {
      text: "Apprendre",
      href: "/dashboard/learn",
      icon: "local_library",
    },
    {
      text: "Progression ",
      href: "/dashboard/colective-progression",
      icon: "bar_chart_4_bars",
    },
    {
      text: "Preferences",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ];
  return (
    <div className="green-1 h-100 w-100 elevation-1 rounded-4 navigation">
      <div className="w-100 d-flex justify-content-center app-logo">
        <img className="w-75 rounded-5" src={logo} alt="logo de l'app" />
      </div>
      <div className="hr green-3 my-3"></div>
      <div className="w-100 options">
        {options.map((option) => (
          <Link
            className="w-100 d-block rounded-4 green-1 d-flex align-items-center text-decoration-none option"
            key={option.text}
            to={option.href}
          >
            <span className="material-symbols-rounded fw-light">
              {option.icon}{" "}
            </span>
            <div className="text">{option.text}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
