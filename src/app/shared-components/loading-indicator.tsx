import React from "react";

const LoadingPageIndicator: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 50px)",
      }}
    >
      <span>Loading...</span>
    </div>
  );
};

export default LoadingPageIndicator;
