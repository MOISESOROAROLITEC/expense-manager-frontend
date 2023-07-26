import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import "./navigation.scss";

interface navOptionsInterface {
  text: string;
  href: string;
  icon: string;
}

const navigationOptions: navOptionsInterface[] = [
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

const Navigation: React.FC = () => {
  const [navButtonActivatedIndex, setNavButtonActivatedIndex] = useState(0);

  useEffect(() => {
    const url = window.location.href;
    for (let index = 0; index < navigationOptions.length; index++) {
      if (url.includes(navigationOptions[index].href)) {
        setNavButtonActivatedIndex(index);
      }
    }
  }, []);

  const activateNavElement = (el: number) => {
    navigationOptions.forEach((_, index) => {
      document
        .querySelector(`#button_${index}`)
        ?.classList.remove("activate-nav-list-btn");
    });
    document
      .querySelector(`#button_${el}`)
      ?.classList.add("activate-nav-list-btn");
  };
  return (
    <div className="green-1 h-100 w-100 elevation-1 rounded-4 navigation">
      <div className="w-100 d-flex justify-content-center app-logo">
        <img className="w-75 rounded-5" src={logo} alt="logo de l'app" />
      </div>
      <div className="hr green-3 my-3"></div>
      <div className="w-100 options">
        {navigationOptions.map((option, index) => (
          <Link
            className={`${
              index === navButtonActivatedIndex && "activate-nav-list-btn"
            } w-100 d-block rounded-4  green-1 d-flex align-items-center text-decoration-none option`}
            key={option.text}
            id={"button_" + index}
            to={option.href}
            onClick={() => {
              activateNavElement(index);
            }}
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
