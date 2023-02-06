import React from "react";
import { Translation } from "react-i18next";
import { Page } from "../../components";
import order from "./assets/confirmation.svg";

export const Index = React.memo(
  ({ className = "", ...rest }) => {
    return (
      <Page className="h-full " {...rest}>
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <div className="hero__left grow-[1] flex justify-center">
            <img src={order} />
          </div>

          <div className="hero__right dark:text-slate-50 flex sm:flex-col justify-center items-left grow-[1] text-gray-700">
            <Translation ns="strings">
              {(t) => (
                <h1 className="text-6xl mx-2 sm:text-6xl sm:mx-2 md:text-8xl">
                  {t("BOOK")}
                </h1>
              )}
            </Translation>

            <Translation ns="strings">
              {(t) => (
                <h1 className="text-6xl mx-2 sm:text-6xl sm:mx-2 md:text-8xl">
                  {t("YOUR")}
                </h1>
              )}
            </Translation>

            <Translation ns="strings">
              {(t) => (
                <h1 className="text-6xl mx-2 sm:text-6xl sm:mx-2 md:text-8xl">
                  {t("WORK")}
                </h1>
              )}
            </Translation>

            <Translation ns="strings">
              {(t) => (
                <h1 className="text-6xl mx-2 sm:text-6xl sm:mx-2 md:text-8xl">
                  {t("PLACE")}
                </h1>
              )}
            </Translation>
          </div>
        </div>
      </Page>
    );
  },
  (prev, next) => prev === next
);

export default Index;
