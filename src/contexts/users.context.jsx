import React, { createContext, useContext, useState } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'

import { AppContext } from './app.context'
import { AuthContext } from './auth.context'

export const UsersContext = createContext(null)
const SESSION_STORAGE_KEY = "USERS"

export const UsersProvider = ({ children }) => {
  const { authentication, changeRole, changeUser } = useContext(AuthContext)
  const { config }  = useContext(AppContext)
  const [users, setUsers] = useState([])

  
  const getUsers = useMutation(() => axios.get(config["getUsers"], { headers: { "authorization": `Bearer ${ authentication.token }` } })
  .then(resp => resp.data)
  .then(data => {
    
    if(data && Array.isArray(data) && data.length > 0) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(users))
        setUsers(data)
        changeRole("admin")
    }
  }));
  
  const reload = React.useCallback(() => mutate());
  
  React.useEffect(() => {

      const localstorageUsers = sessionStorage.getItem(SESSION_STORAGE_KEY) ? JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY)) : [];

      if(!localstorageUsers.length && authentication.isAuthenticated) {
        getUsers.mutate();
      }      
      else {
        setUsers(localstorageUsers)
      }

  }, []);

  React.useEffect(() => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(users))
  }, [ users ])

  React.useEffect(() => {

    if(authentication.isAuthenticated) {
      
      const localstorageUsers = sessionStorage.getItem(SESSION_STORAGE_KEY) ? JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY)) : [];

      if(!localstorageUsers.length) {
        getUsers.mutate();
      } 
      
      else {
        setUsers(localstorageUsers)
      }
    }

    else {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }

  }, [authentication])

  return (
    <UsersContext.Provider value={{ users, isLoading: getUsers.isLoading, reload }}>{children}</UsersContext.Provider>
  )
}

export default UsersProvider