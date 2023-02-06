import React, { useContext } from "react";
import { AuthContext } from "../../../contexts";
import { AiFillDelete } from "react-icons/ai";

export const RecordsBody = ({ records, deleteRecord }) => {
  const { authentication } = useContext(AuthContext);

  return (
    <div className="flex flex-col py-3 grow-[1]">
      {records &&
        records.map((record) => (
          <p
            key={record.id}
            className="flex justify-between items-center transition-colors bg-slate-100 
            hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 px-5 py-3 my-1 rounded-md   text-slate-600"
          >
            {record.user.name}

            {authentication.role === "admin" && (
              <button
                className="p-2 transition-colors hover:bg-slate-500 hover:text-slate-100 rounded-full"
                onClick={() => deleteRecord(record.id)}
              >
                <AiFillDelete />
              </button>
            )}
          </p>
        ))}
    </div>
  );
};

export default RecordsBody;
