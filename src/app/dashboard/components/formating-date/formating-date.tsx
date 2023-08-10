import React from "react";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";

export const FormatingDate: React.FC<{ date: Date | string | number }> = ({
  date,
}) => {
  const formattedDate = format(new Date(date), "dd MMMM yyyy ", {
    locale: frLocale,
  });
  return <div className="date-formated"> {formattedDate} </div>;
};
