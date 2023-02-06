import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";
import axios from 'axios'

export const Reservierung = () => {
    const [dataMp, SetUser] = useState({});
    const [adminEmployees, Setemployee] = useState([]);
    const [roomData, SetRoomData] = useState([]);
    const [roomrecord, SetroomRecord] = useState([])
    const [roomrecordAdmin, SetroomRecordAdmin] = useState([])
    var data_dt = dataMp;
    data_dt = [];
    const requestRoomrecordDataAdmin = () =>

        fetch(process.env.REACT_APP_API + "RoomRecord")
            .then(response =>
                response.json()

            )
            .catch(error => {

            });
    const requestRoomrecordData = () =>
        axios.get("RoomRecord/GetCurrentUser")
            .then(response => { return response.data }

            )
            .catch(error => {

            });
    function deletedayrecord(id) {
        fetch(process.env.REACT_APP_API + "RoomRecord/" + id, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((resp) => {


            })
        })

    }
    const requestData = () =>

        fetch(process.env.REACT_APP_API + "rooms")
            .then(response =>
                response.json()
            );
    const employeedata = () =>
        axios.get('user/Getallusers').then(response => {
            return response.data;
        });

    const userData = () =>
        axios.get('user/GetUserData').then(response => {
            return response.data;
        });

    let body_User = roomrecord.map((obj) => {

        let dayRoomRecord = roomData.filter(x => (x.id == obj.roomId));


        return (
            <tr>

                <td><tr><td>{dataMp.name}</td></tr></td>
                <td>{dateFormat(new Date(obj.date), "yyyy-mm-dd")}</td>
                <td> {dayRoomRecord.map((room_day) => <tr>{room_day.name}</tr>)}</td>
                <td><button className="btn btn-danger" onClick={() => deletedayrecord(obj.id)}>Löschen</button></td>

            </tr>
        )
    })

    let body_admin = roomrecordAdmin.map((obj) => {

        let dayRoomRecord = roomData.filter(x => (x.id == obj.roomId));


        let employeeFound = adminEmployees.filter(x => (x.id == obj.userId));

        return (
            <tr>

                <td> {employeeFound.map((employeename) => <tr>{employeename.name}</tr>)}</td>
                <td>{dateFormat(new Date(obj.date), "yyyy-mm-dd")}</td>
                <td> {dayRoomRecord.map((room_day) => <tr>{room_day.name}</tr>)}</td>
                <td><button className="btn btn-danger" onClick={() => deletedayrecord(obj.id)}>Löschen</button></td>

            </tr>
        )
    })

    useEffect(() => {
        employeedata().then(data => Setemployee(data));
        userData().then(Benuter => SetUser(Benuter));
        requestData().then(data => SetRoomData(data));
        requestRoomrecordData().then(record => SetroomRecord(record));
        requestRoomrecordDataAdmin().then(record => SetroomRecordAdmin(record));
    }, []);

    return (<>{adminEmployees.length > 0 ? (
        <form >
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>Datum</th>
                        <th>Raum</th>


                    </tr>
                </thead>
                {roomrecordAdmin.length > 0 ? (<tbody>
                    {body_admin}
                </tbody>) : (<h3>Keine Reservierung </h3>)
                }
            </table>
        </form>) : (
        <form >
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>Datum</th>
                        <th>Raum</th>


                    </tr>
                </thead>
                {roomrecord.length > 0 ? (<tbody>
                    {body_User}
                </tbody>) : (<h3>Keine Reservierung </h3>)
                }
            </table>
        </form>)


    }</>
    )
}

export default Reservierung