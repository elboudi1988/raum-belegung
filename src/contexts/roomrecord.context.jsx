import React, { useContext, useEffect, useRef } from "react";
import { useMutation } from "react-query";
import { AuthContext } from "./auth.context";
import { CalendarContext } from "./calendar.context";
import { AppContext } from "./app.context";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert";
import { UsersContext } from "./users.context";

export const RoomRecordsContext = React.createContext(null);
export const LOCALSTORAGE_ROOMRECORDS_KEY = "ROOM_RECORDS";
export const CONFIG_ROOMRECORDS_KEY = "daysToShow";

export const RoomRecordsProvider = ({ children }) => {
  const { date } = useContext(CalendarContext);
  const { authentication } = useContext(AuthContext);
  const { config, add } = useContext(AppContext);
  const [roomRecords, setRoomRecords] = React.useState([]);
  const { users } = useContext(UsersContext);

  const _userName = authentication.user?.name ?? "";
  const getRooms = useMutation((date) => {
    axios
      .get(config.getRoomRecords, {
        params: {
          date: moment(date).format("YYYY-MM-DD"),
        },
      })
      .then(({ data }) => data)
      .then((data) => setRoomRecords(data));
  });

  const _createRecord = useMutation(({ date, userid, roomid }) => {
    axios
      .post(config["postRoomRecord"], {
        date,
        userid,
        roomid,
      })
      .then((resp) => resp.data)
      .then((data) => {
        const computedName =
          authentication.role == "admin"
            ? users.find((user) => user.id === userid).name
            : authentication.user.name;
        swal("Gut", "Du hast deinen Platz reserviert ", "success");
        setRoomRecords((prev) => [
          ...prev,
          { date, room_id: roomid, user: { id: userid, name: computedName } },
        ]);
      })
      .catch((err) => {
        swal(
          "Fehler",
          "Bitte wählen sie einen anderen  Raum oder  ein anderes Datum!",
          "error"
        );
      });
  });
  const _deleteRecord = useMutation((id) =>
    axios
      .delete(`${config["deleteRoomRecord"]}/${id}`)
      .then((resp) =>
        setRoomRecords((prev) => prev.filter((record) => record.id !== id))
      )
  );

  useEffect(() => {
    if (!authentication?.isAuthenticated) {
      return;
    }

    const storageData =
      sessionStorage.getItem(LOCALSTORAGE_ROOMRECORDS_KEY) ?? "[]";
    let daysToShow = config[CONFIG_ROOMRECORDS_KEY];

    if (!daysToShow) {
      add({ daysToShow: 7 });
      daysToShow = 7;
    }

    if (!JSON.parse(storageData).length) {
      getRooms.mutate({
        from: moment(date).toISOString(),
        to: moment(date).add(daysToShow, "d").toISOString(),
      });
      return;
    }

    setRoomRecords(JSON.parse(storageData));
  }, []);

  React.useEffect(() => {
    getRooms.mutate(date);
  }, [date]);

  const createRecord = React.useCallback((record) => {
    _createRecord.mutate(record);
  }, []);

  const deleteRecord = React.useCallback((id) => {
    _deleteRecord.mutate(id);
  }, []);

  return (
    <RoomRecordsContext.Provider
      value={{
        isLoading: getRooms.isLoading,
        createRecord,
        deleteRecord,
        records: roomRecords,
      }}
    >
      {children}
    </RoomRecordsContext.Provider>
  );
};

export default RoomRecordsProvider;
