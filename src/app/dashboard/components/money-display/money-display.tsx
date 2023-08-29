import React from "react";

const MoneyDisplay: React.FC<{ amount?: number }> = ({ amount = 0 }) => {
  const formattedAmount = amount.toLocaleString("fr-FR", {
    style: "currency",
    currency: "XOF",
  });

  let devise: string = formattedAmount.split("0 ")[1];

  return (
    <span className="amount-formating">
      <span className="amount">{formattedAmount.split("F")[0]}</span>
      <span className="device"> {devise} </span>
    </span>
  );
};

export default MoneyDisplay;
