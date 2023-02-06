import React from "react";
import moment from "moment";
import { Locale } from "moment";

const weekEndClasses = (isPast = false) => {
  if (isPast) {
    return " text-red-300 dark:text-red-900 ";
  }
  return " text-red-600 dark:text-red-500 ";
};

export const DayWrapper = ({
  className = "",
  date,
  isSelectedDate = false,
  isPast = false,
  isWeekEnd = false,
  isToday,
  setDate,
  ...rest
}) => {
  return (
    <React.Fragment>
      <>
        <a
          {...rest}
          onClick={() => setDate(date)}
          href="#"
          className={`my-2 transition-colors rounded-md hover:text-sky-100 text-center font-mono         lg:hidden py-4 px-3 dark:text-slate-100 text-slate-600 ${
            isPast ? "text-slate-300 dark:text-slate-500" : ""
          } ${isSelectedDate ? "bg-gray-200 dark:bg-slate-700" : ""}  ${
            isWeekEnd ? weekEndClasses(isPast) : ""
          } hover:bg-sky-400 hover:dark:bg-sky-600  ${className}`}
        >
          {moment(date).format("DD ddd")}
        </a>
        <a
          {...rest}
          onClick={() => setDate(date)}
          href="#"
          className={`mx-1 transition-colors rounded-md hover:text-sky-100 text-center font-mono hidden  lg:block py-4 px-3  dark:text-slate-100 text-slate-600 ${
            isPast ? "text-slate-300 dark:text-slate-500" : ""
          } ${isSelectedDate ? "bg-gray-200 dark:bg-slate-700" : ""}  ${
            isWeekEnd ? weekEndClasses(isPast) : ""
          } hover:bg-sky-400 hover:dark:bg-sky-600  ${className}`}
        >
          {moment(date).locale("de").format("DD dddd")}
        </a>
      </>
    </React.Fragment>
  );
};

export default DayWrapper;
