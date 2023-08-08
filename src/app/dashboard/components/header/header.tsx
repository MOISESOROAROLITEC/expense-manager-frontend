import React from "react";
import { useAppSelector } from "../../../store/user/hooks";
import "./header.scss";
import { Link } from "react-router-dom";
import { UserInfosMenu } from "./user-infos-menu";
import Tooltip from "@mui/material/Tooltip";

export const Header: React.FC<{
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}> = () => {
  const navigationWidth = 250;
  const breackPointToHideNavigation = 992;
  const user = useAppSelector((state) => state.user);
  const [anchorUserInfo, setAnchorUserInfo] =
    React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUserInfo(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorUserInfo(null);
  };

  function disconnectUser() {
    localStorage.removeItem("token");
  }
  function handleHideNavigation(clicked: boolean = false) {
    const windowWidth = window.innerWidth;
    const leftElement = document.getElementsByClassName("left-element")[0];
    const rightElement = document.getElementsByClassName("right-element")[0];
    if (leftElement && rightElement) {
      const left = window.getComputedStyle(leftElement);
      if (clicked) {
        if (left.right === "0px") {
          (leftElement as HTMLElement).style.right = `${navigationWidth}px`;
          if (windowWidth < breackPointToHideNavigation) {
            (rightElement as HTMLElement).style.left = "0px";
          } else {
            (rightElement as HTMLElement).style.left = `-${navigationWidth}px`;
          }
          (rightElement as HTMLElement).style.flex = "1 0 auto";
        } else {
          (leftElement as HTMLElement).style.right = "0px";
          (rightElement as HTMLElement).style.left = "0px";
          (rightElement as HTMLElement).style.flex = "1 1 auto";
        }
      } else {
        if (windowWidth < breackPointToHideNavigation) {
          (rightElement as HTMLElement).style.left = "0px";
        } else {
          if (left.right === "0px") {
            (rightElement as HTMLElement).style.left = `0px`;
            (rightElement as HTMLElement).style.flex = "1 1 auto";
          } else {
            (rightElement as HTMLElement).style.left = `-${navigationWidth}px`;
            (rightElement as HTMLElement).style.flex = "1 0 auto";
          }
        }
      }
    }
  }
  window.addEventListener("resize", () => handleHideNavigation(false));

  return (
    <div className="rounded-4 elevation-1 d-flex justify-content-between align-items-center w-100 green-1 header">
      <span
        className="d-block cursor-pointer material-symbols-rounded menu-show-navigation"
        onClick={() => handleHideNavigation(true)}
      >
        menu
      </span>
      <div className="app-name-slogan">
        <h5 className="text-center app-name">Save Money</h5>
        <h6 className="text-center app-slogan">Eparger pour mieux investir</h6>
      </div>
      <div className="d-flex justify-content-center align-items-center user-block">
        <div className="vr"></div>
        <Tooltip title="voir vos informations">
          <span
            className="d-flex justify-content-center align-items-center userFirstName-block"
            onClick={handleClick}
          >
            <span className="material-symbols-rounded">account_circle</span>
            <span className="d-none d-sm-block userFirstName">
              {user.userFirstName}
            </span>
            <span className="material-symbols-rounded">arrow_drop_down</span>
          </span>
        </Tooltip>
        <UserInfosMenu
          anchorEl={anchorUserInfo}
          handleClose={handleClose}
          username={user.name}
          email={user.email}
        />
        <div className="vr small-vr"></div>
        <Tooltip title="Se déconnecter">
          <Link
            to={"/login"}
            className="material-symbols-rounded logout-button"
            onClick={disconnectUser}
          >
            logout
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};
