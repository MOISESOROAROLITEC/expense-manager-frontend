import React from "react";

const MoneyDisplay: React.FC<{ amount?: number }> = ({ amount = 0 }) => {
  const formattedAmount = amount.toLocaleString("fr-FR", {
    style: "currency",
    currency: "XOF",
  });

  return <span>{formattedAmount}</span>;
};

export default MoneyDisplay;
