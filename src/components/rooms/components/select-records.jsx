import moment from "moment";
import React, { useContext } from "react";
import { Translation } from "react-i18next";
import { AuthContext, UsersContext } from "../../../contexts";

export const SelectRecords = ({ addRecord, roomId, date }) => {
  const { authentication } = useContext(AuthContext);
  const { users } = useContext(UsersContext);
  const { role, user } = authentication;

  const onSubmit = (form) => {
    form.preventDefault();
    addRecord({
      roomid: roomId,
      date: moment(date).format("YYYY-MM-DD"),
      userid: form.target.elements["user_id"].value,
      userName: users.find(
        (user) => user.id === form.target.elements["user_id"].value
      ),
    });
  };

  if (role === "admin") {
    return (
      <form onSubmit={onSubmit} className="flex">
        <select
          name="user_id"
          className="text-slate-700 font-semibold py-2 px-1 mr-2"
        >
          {users.map((user) => (
            <option value={user.id}>{user.name} </option>
          ))}
        </select>
          <Translation ns="common">
            {
              t => (
                <button className="submit bg-sky-400 text-slate-100 px-3 rounded-sm">
                  { t("ADD") }
                </button>
              )
            }
          </Translation>

      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} name="register_room">
      <input type="hidden" name="user_id" value={user.id} />
      <Translation>
        {(t) => (
          <button
            className="bg-blue-400 dark:bg-blue-700 transition-colors hover:bg-blue-500 
            dark:hover:bg-blue-900 px-1 py-2 rounded-sm text-slate-100 w-full"
            type="submit"
          >
            {t(`APPLY`)} {user.name}
          </button>
        )}
      </Translation>
    </form>
  );
};

export default SelectRecords;
