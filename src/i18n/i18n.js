import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import * as langs from './resources'

export const lang = i18n 
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    defaultNS: "common",
    caches: ['localStorage', 'cookie'],
    resources: {...langs},

    interpolation: {
      escapeValue: false
    }
  });

  export default lang;