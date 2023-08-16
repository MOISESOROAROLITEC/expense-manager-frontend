import React from "react";
import { useAppSelector } from "../../../store/hooks";
import "./header.scss";
import { Link } from "react-router-dom";
import { UserInfosMenu } from "./user-infos-menu";
import Tooltip from "@mui/material/Tooltip";
import { handleHideNavigation } from "../../../shared/utilities/hide-navigation";

interface HeaderInterface {
  setEditTarget: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCreateTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderInterface> = ({
  setEditTarget,
  setOpenCreateTransaction,
}) => {
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

  window.addEventListener("resize", () => handleHideNavigation(false));

  return (
    <div className="rounded-4 elevation-1 d-flex justify-content-between align-items-center w-100 primary-1 header">
      <span
        id="menu"
        tabIndex={1}
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
          setEditTarget={setEditTarget}
          setOpenCreateTransaction={setOpenCreateTransaction}
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
