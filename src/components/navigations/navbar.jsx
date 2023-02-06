import React, { useContext } from "react";
import { Link } from "@reach/router";
import Netzlab from "./netzlab_Logo_x.svg";
import { AppContext, AuthContext } from "../../contexts";
import { IoMdMoon } from "react-icons/io";
import { BsFillSunFill } from "react-icons/bs";
import { Translation } from "react-i18next";
import LanguageButton from "./components/languagebutton";

export const Navbar = React.memo(
  ({ isAuthenticated = false }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { config, add } = useContext(AppContext);
    const { logout } = useContext(AuthContext);
    const { currentTheme, applicationName } = config;

    const setTheme = (theme) => {
      add({ currentTheme: theme });
    };

    return (
      <nav className="bg-slate-100 py-4 border-gray-200 px-2 dark:bg-gray-800">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex items-center">
            <img src={Netzlab} className="w-20 sm:w-40" alt="" />
          </Link>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
          </button>

          <div
            className={`w-full md:block md:w-auto ${!isOpen && "hidden"}`}
            id="navbar-default"
          >
            <ul className="flex flex-col p-4 mt-4 bg-slate-100 rounded-lg border border-slate-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-slate-100 dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
              <li className="flex justify-center items-center">
                <LanguageButton />
              </li>

              <li className="flex text-2xl">
                <i
                  onClick={() =>
                    setTheme(currentTheme === "light" ? "dark" : "light")
                  }
                  className="hover:bg-blue-700 hover:text-white dark:text-white cursor-pointer rounded-full p-3 transition-colors duration-100"
                >
                  {currentTheme === "light" ? <BsFillSunFill /> : <IoMdMoon />}
                </i>
              </li>
              {!isAuthenticated && (
                <li className="flex items-center text-gray-700 hover:text-blue-500">
                  <Link
                    to="/login"
                    className="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <Translation>{(t) => t("LOGIN_LINK")}</Translation>
                    </button>
                  </Link>
                </li>
              )}

              {isAuthenticated && (
                <Translation>
                  {(t) => (
                    <React.Fragment>
                      <li className="flex items-center text-gray-700 hover:text-blue-500 mx-2 py-2 pr-4 pl-3 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">
                        <a
                          href="/"
                          className="block mx-2 py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                          aria-current="page"
                        >
                          Home
                        </a>
                      </li>
                      <li className="flex items-center text-gray-700 hover:text-blue-500 mx-2 py-2 pr-4 pl-3 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">
                        <a
                          href="/booking"
                          className="block mx-2 py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                          aria-current="page"
                        >
                          {t("BOOKING")}
                        </a>
                      </li>
                      <li className="flex items-center text-gray-700 hover:text-blue-500 mx-2 py-2 pr-4 pl-3 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">
                        <a
                          href="#"
                          onClick={logout}
                          className="block mx-2 py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                          aria-current="page"
                        >
                          {t("LOGOUT_BUTTON")}
                        </a>
                      </li>
                    </React.Fragment>
                  )}
                </Translation>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  },
  (prev, next) => prev === next
);

export default Navbar;
