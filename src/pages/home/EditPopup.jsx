import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./booking.css";

function EditPopup(props) {
  const [date, setDate] = useState(props.initialDate);
  const [room, setRoom] = useState(props.initialRoom);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");

  const roomDatarequest = () =>
    fetch("https://localhost:5001/api/rooms").then((response) =>
      response.json()
    );

  useEffect(() => {
    roomDatarequest().then((data) => setRooms(data));
  }, []);

  async function handleSave() {
    try {
      const response = await fetch("/api/updateDateAndRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.authToken}`,
        },
        body: JSON.stringify({ date, room: selectedRoom }),
      });
      const data = await response.json();
      if (data.success) {
        // Close the popup and save the new values
        props.onSave(date, selectedRoom);
      } else {
        // Display an error message
        alert("Failed to update date and room");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update date and room");
    }
  }
  function handleClose() {
    // Close the popup without saving
    props.onClose();
  }
  return (
    <div onClick={handleClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="edit-popup"
      >
        <form>
          <label>
            Datum:
            <DatePicker
              className="edit-popup-datepicker"
              selected={date}
              onChange={setDate}
            />
          </label>
          <br />
          <label>
            Räume:
            <br />
            <br />
            <select
              className="edit-popup-select"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </label>
        </form>
        <div></div>
        <br />

        <button
          onClick={handleSave}
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 
                focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
                text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Save
        </button>

        <button
          onClick={handleClose}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 
                focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
                text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default EditPopup;
