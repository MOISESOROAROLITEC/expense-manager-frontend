import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../components/nav/navigation";
import { Header } from "../components/header/header";
import { UserByTokenResponse } from "../../shared/user-interface/interface";
import { getUserByTokenGraphQL } from "../../shared/utilities/graphql-request";
import { setFirstName, setInitial, updateUser } from "../../store/user/slice";
import { useAppDispatch } from "../../store/user/hooks";
import { useLazyQuery } from "@apollo/client";
import { catchAuthRequestError } from "../../auth/auth.service";

import "./main.scss";
import { DialogDifineTarget } from "../components/dialog-define-target/dialog-define-target";

const Dashboard: React.FC = () => {
  document.title = "Tableau de bord";
  const [openDefineTarget, setOpenDefineTarget] = React.useState(false);
  const dispatch = useAppDispatch();
  const [showNav, setShowNav] = useState(true);
  const [getUserInfo] = useLazyQuery<UserByTokenResponse>(
    getUserByTokenGraphQL
  );

  useEffect(() => {
    const getUserInfos = async () => {
      try {
        const user = await getUserInfo({ fetchPolicy: "no-cache" });
        const userData = user.data?.getUserByToken;
        if (userData && userData.token) {
          dispatch(updateUser(userData));
          dispatch(setInitial(userData.name));
          dispatch(setFirstName(userData.name));
          if (userData.target === 0) {
            setOpenDefineTarget(true);
          }
        } else {
          catchAuthRequestError(user.error);
        }
      } catch (error) {
        catchAuthRequestError(error);
      }
    };

    getUserInfos();
  }, [dispatch, getUserInfo]);

  return (
    <div className="row m-0 p-0 dashboard">
      <div className={"left-element"}>
        <Navigation />
      </div>
      <div className="p-0 right-element">
        <div className="dashboard-header">
          <Header showNav={showNav} setShowNav={setShowNav} />
        </div>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
      <button
        className="btn btn-primary d-flex align-items-center justify-content-center elevation-0 add-btn"
        data-bs-placement="auto"
        data-bs-title="Faire une operation"
        data-bs-for="scrolableDialog"
      >
        <span className="material-symbols-rounded">add</span>
      </button>
      <DialogDifineTarget
        open={openDefineTarget}
        setOpen={setOpenDefineTarget}
      />
    </div>
  );
};

export default Dashboard;
