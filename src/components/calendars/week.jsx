import moment from "moment";
import React, { useContext } from "react";
import { AppContext, CalendarContext } from "../../contexts";

import Day from "./day";

export const Week = ({ className = "" }) => {
  const { setDate, date } = useContext(CalendarContext);
  const { config, add } = useContext(AppContext);

  if (!config["daysToShow"]) {
    add({ daysToShow: 7 });
  }

  const _daysToShow = config.daysToShow;
  const days = [];

  for (let i = 0; i <= _daysToShow; i++) {
    days.push(moment(date).add(i, "d"));
  }

  return (
    <div className={`flex flex-col sm:flex-row mx-2 ${className}`}>
      {days.map((day, i) => (
        <Day
          isSelectedDate={moment(day).dayOfYear() === moment(date).dayOfYear()}
          setDate={setDate}
          key={i}
          date={day}
        />
      ))}
    </div>
  );
};

export default Week;
