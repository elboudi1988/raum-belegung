import React from "react";
import { Page } from "../../components";
import { Translation } from "react-i18next";
import authenticate from "./assets/authenticate.svg";
import { useContext } from "react";
import { AuthContext } from "../../contexts";
import { AiFillCloseSquare } from "react-icons/ai";

export const LoginPage = ({ className = "", ...rest }) => {
  const { login, error, loading, clear, authentication } =
    useContext(AuthContext);

  const loginUser = (form) => {
    form.preventDefault();
    const username = form.target.elements["username"].value;
    const password = form.target.elements["password"].value;

    login(username, password);
  };

  return (
    <Page className="flex flex-col h-full">
      <div className="form__wrapper pt-20 px-24 sm:px-5 sm:mx-10 md:mx-32 lg:mx-64 lg-px:44">
        <div className="flex justify-center">
          <img src={authenticate} className="w-44 sm:w-60" alt="" />
        </div>

        <form onSubmit={loginUser} className="sm:p-10">
          <div className="relative z-0 mb-6 w-full group">
            <Translation ns="strings">
              {(t) => (
                <h1 className="text-6xl text-center text-slate-700 dark:text-slate-50 uppercase">
                  {t("AUTHENTICATE")}
                </h1>
              )}
            </Translation>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="username"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <Translation ns="strings">
              {(t) => (
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  {t("USERNAME")}
                </label>
              )}
            </Translation>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <input
              type="password"
              name="password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <Translation ns="strings">
              {(t) => (
                <label
                  htmlFor="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  {t("PASSWORD")}
                </label>
              )}
            </Translation>
          </div>

          {!loading && (
            <button
              disabled={loading}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <Translation>{(t) => t("LOGIN_BUTTON")}</Translation>
            </button>
          )}

          {loading && (
            <button
              disabled
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Loading...
            </button>
          )}
        </form>
      </div>
      {error && (
        <div className="w-full px-4 absolute bottom-0 flex justify-around">
          <div
            className="p-4 flex w-[90vh] justify-center items-center mb-4 absolute bottom-0 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
            role="alert"
          >
            <span className="font-medium">Login filed:</span>
            <span className="mx-2">Invalid username or password</span>
            <button className="text-2xl" onClick={clear}>
              <AiFillCloseSquare />
            </button>
          </div>
        </div>
      )}
    </Page>
  );
};

export default LoginPage;
