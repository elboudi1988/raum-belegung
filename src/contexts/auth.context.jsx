import React from "react";
import { useMutation } from "react-query";
import axios from "axios";
import { AppContext } from "./app.context";
import { navigate } from "@reach/router";

const LOCAL_STORAGE_AUTHKEY = "AUTH";

const initialState = {
  token: null,
  isAuthenticated: false,
  user: null,
};

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const { config } = React.useContext(AppContext);
  const [authentication, setAuthentication] = React.useState(
    localStorage.getItem(LOCAL_STORAGE_AUTHKEY)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTHKEY))
      : initialState
  );

  const { isLoading, mutate, error, reset } = useMutation((user) =>
    axios
      .post(config["loginUrl"], {
        username: user.username,
        password: user.password,
      })

      .then((resp) => resp.data)
      .then((data) => {
        axios
          .get(config["getUserData"], {
            headers: {
              authorization: `Bearer ${data.token}`,
            },
          })
          .then((resp) => resp.data)
          .then((user) => {
            setAuthentication({
              isAuthenticated: true,
              token: data.token,
              role: "user",
              user,
            });
          });
        navigate("/");
      })
  );

  const changeRole = React.useCallback((role = "user") => {
    setAuthentication((prev) => ({ ...prev, role }));
  }, []);

  const changeUser = React.useCallback((user) => {
    setAuthentication((prev) => ({ ...prev, user: { ...user } }));
  }, []);

  //componentDidMount
  React.useEffect(() => {
    const localStorageAuthentication = localStorage.getItem(
      LOCAL_STORAGE_AUTHKEY
    );

    if (localStorageAuthentication) {
      setAuthentication(JSON.parse(localStorageAuthentication));
    }
  }, []);

  //componentDidUpdate on authentication
  //automatically save when authentication has ben changed
  React.useEffect(() => {
    if (authentication.isAuthenticated) {
      return localStorage.setItem(
        LOCAL_STORAGE_AUTHKEY,
        JSON.stringify(authentication)
      );
    }

    localStorage.removeItem(LOCAL_STORAGE_AUTHKEY);
  }, [authentication]);

  const login = React.useCallback(
    (username, password) => mutate({ username, password }),
    []
  );
  const clear = React.useCallback(() => reset(), []);
  const logout = React.useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_AUTHKEY);
    setAuthentication(initialState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        changeRole,
        changeUser,
        login,
        error,
        logout,
        clear,
        authentication,
        loading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
