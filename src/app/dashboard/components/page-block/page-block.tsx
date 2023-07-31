import React, { ReactElement } from "react";

export const PageBlock: React.FC<{ children: ReactElement }> = ({
  children,
}) => {
  return <div className="elevation-3 p-4 rounded-3">{children}</div>;
};
