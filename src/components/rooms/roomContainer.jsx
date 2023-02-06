import React, { useContext } from "react";
import {
  CalendarContext,
  RoomContext,
  RoomRecordsContext,
} from "../../contexts";
import SelectRecords from "./components/select-records";
import { RecordsBody } from "./components";

export const RoomContainer = ({ className = "", ...rest }) => {
  const { rooms, update } = useContext(RoomContext);
  const { records, createRecord, deleteRecord } =
    useContext(RoomRecordsContext);
  const { date } = useContext(CalendarContext);

  return (
    <div className="flex px-2 justify-center my-4 rounded-md">
      {rooms.map(({ name, id, roomCapacity }, i) => (
        <div
          className="flex flex-col justify-between select-none mx-1 px-5 py-3 
          font-mono rounded-md dark:text-slate-100
           dark:bg-slate-600 bg-slate-50 w-96 h-80"
          key={id}
        >
          <header
            className={`flex-grow-[0] flex justify-between ${
              records &&
              records.filter(({ room_id }) => room_id === id)?.length ===
                roomCapacity
                ? "text-red-500 "
                : ""
            } }`}
          >
            {" "}
            <p className="cursor-pointer">
              {name} {records.filter((record) => record.room_id === id).length}/
              {roomCapacity}
            </p>
          </header>

          <RecordsBody
            deleteRecord={deleteRecord}
            roomId={id}
            records={records?.filter(({ room_id }) => room_id === id) || null}
            selectedDate={date}
          />

          {records.filter(({ room_id }) => room_id == id).length <
            roomCapacity && (
            <SelectRecords addRecord={createRecord} roomId={id} date={date} />
          )}
        </div>
      ))}
    </div>
  );
};

export default RoomContainer;
