import React, { useContext } from "react";
import { MonthView } from "./month";
import moment from "moment";
import { CalendarContext } from "../../contexts";
export const YearView = ({ className, ...rest }) => {
  const { date } = useContext(CalendarContext);

  return (
    <div className="dark:text-slate-100 text-slate-600 flex">
      {" "}
      <span className="px-1 font-bold">{moment(date).format("YYYY")}</span>{" "}
      <MonthView />{" "}
    </div>
  );
};

export default YearView;
