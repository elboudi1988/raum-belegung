import React from 'react'
import { AppContext } from './app.context';
import { useMutation } from 'react-query';
import axios from 'axios';

const LOCAL_STORAGE_ROOMS_KEY = "ROOMS";
export const RoomContext = React.createContext(null);

//RoomProvider should be the children of AppProvider and CalendarProvider
export const RoomProvider = ({ children }) => {

  const localRooms = localStorage.getItem(LOCAL_STORAGE_ROOMS_KEY);
  const { config } = React.useContext(AppContext);

  const [rooms, setRooms]   = React.useState(JSON.parse(localRooms) || []);
  const {isLoading, mutate} = useMutation(() => axios.get(config["getRooms"]).then(resp => resp.data).then(data => setRooms(data)))
  
  //on the componentDidMount we look to the storage
  //and if there is no rooms we load it from the server
  React.useEffect(() => {
    if(rooms.length <= 0) mutate();
  }, [])

  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ROOMS_KEY, JSON.stringify(rooms));
  }, [rooms])
  
  return (
    <RoomContext.Provider value={{ rooms, update: mutate, roomsLoading: isLoading }}>
      {children}
    </RoomContext.Provider>
  )
}

export default RoomContext