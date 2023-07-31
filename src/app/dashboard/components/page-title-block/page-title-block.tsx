import React from "react";
import "./page-title-block.scss";

interface PageTitleBlockInterface {
  title: string;
  subtitle: string;
}

export const PageTitleBlock: React.FC<PageTitleBlockInterface> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="page-title-block">
      <h4 className="mb-0 title"> {title} </h4>
      <div className="subtitle"> {subtitle} </div>
    </div>
  );
};
