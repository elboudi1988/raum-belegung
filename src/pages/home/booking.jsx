import React, { useState, useEffect, useContext } from "react";
import { Page } from "../../components";
import axios from "axios";
import swal from "sweetalert";
import dateFormat from "dateformat";
import { AuthContext } from "../../contexts/auth.context";
import "./booking.css";
import { useMutation } from "react-query";
import { AppContext } from "../../contexts/app.context";
import MoonLoader from "react-spinners/MoonLoader";
import EditPopup from "./EditPopup";

export const Booking = () => {
  const [adminEmployees, Setemployee] = useState([]);
  const [roomData, SetRoomData] = useState([]);
  const [roomrecordUser, SetroomRecordUser] = useState([]);
  const [roomrecordAdmin, SetroomRecordAdmin] = useState([]);
  const { authentication, changeRole, changeUser } = useContext(AuthContext);
  const { config } = useContext(AppContext);
  const [loading, setloading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const computedName = authentication.user.name;

  const _deleteRecord = useMutation((id) =>
    axios.delete(`${config["deleteRoomRecord"]}/${id}`).then((resp) => {
      swal("Gut", "Du hast deinen Platz reserviert ", "success");
      result.json().then((resp) => {});
    })
  );
  const deleteRecord = React.useCallback((id) => {
    _deleteRecord.mutate(id);
  }, []);
  const requestRoomrecordDataAdmin = () =>
    fetch("https://localhost:5001/api/reservations", {
      headers: { authorization: `Bearer ${authentication.token}` },
    })
      .then((response) => response.json())
      .then((record) => SetroomRecordAdmin(record))
      .catch((error) => {});
  const employeedata = () =>
    axios
      .get("https://localhost:5001/api/user/getallusers", {
        headers: { authorization: `Bearer ${authentication.token}` },
      })
      .then((response) => {
        return response.data;
      })
      .then((data) => Setemployee(data));

  const roomDatarequest = () =>
    fetch("https://localhost:5001/api/rooms")
      .then((response) => response.json())
      .then((data) => SetRoomData(data));
  const requestRoomrecordData = () =>
    axios
      .get("https://localhost:5001/api/GetCurrentUser/", {
        headers: { authorization: `Bearer ${authentication.token}` },
      })
      .then((response) => {
        return response.data;
      })
      .then((record) => SetroomRecordUser(record))
      .catch((error) => {});
  const handleEditClick = (event) => {
    event.preventDefault();
    setShowPopup(true);
  };
  function handleClose() {
    setShowPopup(false);
  }

  function handleSave() {
    setShowPopup(false);
  }
  let body_admin = roomrecordAdmin.map((obj) => {
    let dayRoomRecord = roomData.filter((x) => x.id == obj.roomId);

    let employeeFound = adminEmployees.filter((x) => x.id == obj.userId);

    return (
      <tr className="transition-colors bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 px-5 py-3 my-1 rounded-md   text-slate-600">
        <td>
          {" "}
          {employeeFound.map((employeename) => (
            <tr>{employeename.name}</tr>
          ))}
        </td>
        <td>{dateFormat(new Date(obj.date), "yyyy-mm-dd")}</td>
        <td>
          {" "}
          {dayRoomRecord.map((room_day) => (
            <tr>{room_day.name}</tr>
          ))}
        </td>
        <td>
          <button
            className="text-white bg-red-700 hover:bg-yellow-800 focus:ring-4 
                focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
                text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
            onClick={handleEditClick}
          >
            Bearbeiten
          </button>
        </td>
        <td>
          <button
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 
                        focus:outline-none focus:ring-red-300 font-medium rounded-lg
                        text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={() => deleteRecord(obj.id)}
          >
            Löschen
          </button>
        </td>
      </tr>
    );
  });

  let body_User = roomrecordUser.map((obj) => {
    let dayRoomRecord = roomData.filter((x) => x.id == obj.roomId);

    return (
      <tr className="flex justify-between items-center transition-colors bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 px-5 py-3 my-1 rounded-md   text-slate-600">
        <td className="items-center ">
          <tr>
            <td>{computedName}</td>
          </tr>
        </td>
        <td>{dateFormat(new Date(obj.date), "yyyy-mm-dd")}</td>
        <td>
          {" "}
          {dayRoomRecord.map((room_day) => (
            <tr>{room_day.name}</tr>
          ))}
        </td>
        <td>
          <button
            className="text-white bg-red-700 hover:bg-yellow-800 focus:ring-4 
                focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
                text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
            onClick={handleEditClick}
          >
            Bearbeiten
          </button>
        </td>
        <td>
          <button
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 
                focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
                text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={() => deleteRecord(obj.id)}
          >
            Löschen
          </button>
        </td>
      </tr>
    );
  });
  useEffect(() => {
    setloading(true);
    requestRoomrecordData();
    employeedata();
    requestRoomrecordDataAdmin();
    roomDatarequest();
    setTimeout(() => {
      setloading(false);
    }, 5000);
  }, []);

  return (
    <Page>
      {showPopup && <EditPopup onClose={handleClose} onSave={handleSave} />}
      <>
        {loading ? (
          <MoonLoader
            className="spinner"
            color="#c48604"
            loading={loading}
            cssOverride={{}}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>
            {adminEmployees.length > 0 ? (
              <form className="flex flex-col py-3 grow-[1]">
                <table className="customers">
                  <thead>
                    <tr>
                      <th className="  transition-colors bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 px-5 py-3 my-1 rounded-md   text-slate-600">
                        name
                      </th>
                      <th className="  transition-colors bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 px-5 py-3 my-1 rounded-md   text-slate-600">
                        Datum
                      </th>
                      <th className="  transition-colors bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 px-5 py-3 my-1 rounded-md   text-slate-600">
                        Raum
                      </th>
                      <th className="  transition-colors bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 px-5 py-3 my-1 rounded-md   text-slate-600"></th>
                      <th className="  transition-colors bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 px-5 py-3 my-1 rounded-md   text-slate-600"></th>
                    </tr>
                  </thead>
                  {roomrecordAdmin.length > 0 ? (
                    <tbody>{body_admin}</tbody>
                  ) : (
                    <h3>Keine Reservierung </h3>
                  )}
                </table>
              </form>
            ) : (
              <form className="flex flex-col py-3 grow-[1]">
                <table className="customers">
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>Datum</th>
                      <th>Raum</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  {roomrecordUser.length > 0 ? (
                    <tbody>{body_User}</tbody>
                  ) : (
                    <h3>Keine Reservierung </h3>
                  )}
                </table>
              </form>
            )}
          </>
        )}
      </>
    </Page>
  );
};

export default Booking;
