import React from "react";
import "./header.scss";
import { useAppSelector } from "../../store/user/hooks";

export const Header: React.FC<{
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}> = () => {
  const navigationWidth = 250;
  const breackPointToHideNavigation = 992;
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
  const userFirstName = useAppSelector((state) => state.user.userFirstName);
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
        <span
          className="d-flex justify-content-center align-items-center"
          title="voir vos informations"
        >
          <span className="material-symbols-rounded">account_circle</span>
          <span className="d-none d-sm-block userFirstName">
            {userFirstName}
          </span>
        </span>
      </div>
    </div>
  );
};
