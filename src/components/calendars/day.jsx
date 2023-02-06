import moment from "moment";
import React from "react";

import { DayWrapper } from "./components";

export const Day = ({ date, isSelectedDate = false, setDate }) => {
  const isWeekEnd = moment(date).day() === 0 || moment(date).day() === 6;
  const isToday = moment(date).dayOfYear() === moment().dayOfYear();
  const isPast = moment(date) < moment();

  return (
    <React.Fragment>
      <DayWrapper
        className={isToday ? "text-green-500 dark:text-green-500" : ""}
        isSelectedDate={isSelectedDate}
        isToday={isToday}
        isPast={isPast}
        isWeekEnd={isWeekEnd}
        setDate={setDate}
        date={date}
      />
    </React.Fragment>
  );
};

export default Day;
