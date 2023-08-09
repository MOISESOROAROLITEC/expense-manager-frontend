import Tooltip from "@mui/material/Tooltip";
import React from "react";

export const RequiredFielTooltip: React.FC = () => {
  return (
    <Tooltip title="Ce champs est obligatoire">
      <span
        style={{
          width: "10px",
          height: "10px",
          color: "#ff0000c0",
        }}
      >
        *
      </span>
    </Tooltip>
  );
};
