import React, { ReactElement } from "react";
import "./page-block.scss";

export const PageBlock: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  return <div className="elevation-3 p-4 rounded-3 page-block">{children}</div>;
};
