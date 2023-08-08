import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";

interface UserInfosMenuInterface {
  anchorEl: Element | null;
  handleClose: any;
  username: string;
  email: string;
  setEditTarget: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserInfosMenu: React.FC<UserInfosMenuInterface> = ({
  anchorEl,
  handleClose,
  username,
  email,
  setEditTarget,
}) => {
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  function disconnect() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function handleUpdateTarget() {
    setEditTarget(true);
  }

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      className="user-infos-menu"
    >
      <MenuItem className="list-item">
        <div className="userInfos" onClick={(e) => e.stopPropagation()}>
          <div className="username" style={{ color: "#2d6a4f" }}>
            {" "}
            {username}{" "}
          </div>
          <div className="email"> {email} </div>
        </div>
      </MenuItem>
      <Divider>
        <Chip label="Transactions" />
      </Divider>
      <MenuItem className="mt-1 list-item transaction" onClick={handleClose}>
        <ListItemIcon>
          <span className="material-symbols-rounded">arrow_upward</span>
        </ListItemIcon>
        Debiter votre compte
      </MenuItem>
      <MenuItem className="list-item transaction" onClick={handleClose}>
        <ListItemIcon>
          <span className="material-symbols-rounded">arrow_downward</span>
        </ListItemIcon>
        Crediter votre compte
      </MenuItem>
      <Divider></Divider>
      <MenuItem className="list-item updateTarget" onClick={handleUpdateTarget}>
        <ListItemIcon>
          <span className="material-symbols-rounded">update</span>
        </ListItemIcon>
        Modifier mon objectif
      </MenuItem>
      <Divider></Divider>
      <MenuItem className="logout" onClick={disconnect}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Se déconnecter
      </MenuItem>
    </Menu>
  );
};
