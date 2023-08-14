import React from "react";

export const TableLoader: React.FC = () => {
  return (
    <div className="table-loader">
      <h5 className="card-title placeholder-glow">
        <span className="placeholder col-6"></span>
      </h5>
      <p className="card-text placeholder-glow">
        <span className="placeholder w-25"></span>
        <span className=""> </span>
        <span className="placeholder w-50"></span>
        <span className="placeholder w-100"></span>
        <span className="placeholder w-75 placeholder-sm"></span>
        <span className=""> </span>
        <span className="placeholder w-25 placeholder-xs"></span>
        <span className=""> </span>
        <span className="placeholder w-25 placeholder-xs"></span>
        <span className=""> </span>
        <span className="placeholder w-25 placeholder-xs"></span>
      </p>
    </div>
  );
};
