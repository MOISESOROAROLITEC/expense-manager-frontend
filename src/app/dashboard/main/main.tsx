import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navigation } from "../components/nav/navigation";
import { Header } from "../components/header/header";
import { UserByTokenResponse } from "../../shared/interfaces/user-interfaces";
import { getUserByTokenGraphQL } from "../../shared/utilities/graphql-request";
import { useAppDispatch } from "../../store/hooks";
import { useLazyQuery } from "@apollo/client";
import { DialogDifineTarget } from "../components/dialog-define-target/dialog-define-target";
import { MakeTransactionDialog } from "../components/make-transaction/make-transaction";
import {
  setInitialAction,
  setFirstNameAction,
  updateUserAction,
} from "../../store/user/slice";
import "./main.scss";
import Tooltip from "@mui/material/Tooltip";
import { toastInfo } from "../../shared/toast/toast";

const Dashboard: React.FC = () => {
  document.title = "Tableau de bord";
  const [openDefineTarget, setOpenDefineTarget] = React.useState(false);
  const [openTransaction, setOpenTransaction] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [getUserInfo] = useLazyQuery<UserByTokenResponse>(
    getUserByTokenGraphQL
  );

  useEffect(() => {
    function disconnectAndRedirectUser() {
      localStorage.removeItem("token");
      toastInfo("Veillez vous connecter");
      navigate("/");
    }

    const getUserInfos = async () => {
      try {
        const user = await getUserInfo({ fetchPolicy: "no-cache" });
        const userData = user.data?.getUserByToken;
        if (userData && userData.token) {
          dispatch(updateUserAction({ ...userData }));
          dispatch(setInitialAction(userData.name));
          dispatch(setFirstNameAction(userData.name));
          if (userData.target === 0) {
            setOpenDefineTarget(true);
          }
        } else {
          disconnectAndRedirectUser();
        }
      } catch (error) {
        disconnectAndRedirectUser();
      }
    };

    getUserInfos();
  }, [dispatch, getUserInfo, navigate]);

  return (
    <div className="row m-0 p-0 dashboard">
      <div className={"left-element"}>
        <Navigation />
      </div>
      <div className="p-0 right-element">
        <div className="dashboard-header">
          <Header
            setOpenCreateTransaction={setOpenTransaction}
            setEditTarget={setOpenDefineTarget}
          />
        </div>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
      <Tooltip title="Effectuez une transaction">
        <button
          className="btn btn-primary d-flex align-items-center justify-content-center elevation-0 add-btn"
          data-bs-placement="auto"
          data-bs-title="Faire une operation"
          data-bs-for="scrolableDialog"
          onClick={() => setOpenTransaction(true)}
        >
          <span className="material-symbols-rounded">add</span>
        </button>
      </Tooltip>
      <DialogDifineTarget
        open={openDefineTarget}
        setOpen={setOpenDefineTarget}
      />
      <MakeTransactionDialog
        open={openTransaction}
        setOpen={setOpenTransaction}
      />
    </div>
  );
};

export default Dashboard;
