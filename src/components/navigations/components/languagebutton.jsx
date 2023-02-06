import React from 'react'
import { RiEnglishInput } from 'react-icons/ri'
import { AiFillCloseCircle } from 'react-icons/ai';
import { Menu } from '@headlessui/react'
import { useState } from 'react';
import i18n from "i18next";


export const LanguageButton = React.memo(() => {
 
  return (
    <React.Fragment>

        <span onClick={ () => i18n.changeLanguage("en") } className={`cursor-pointer mx-1 ${ i18n.language == "de" ? "text-slate-700 dark:text-slate-100": "text-blue-500" }`}>
          EN
        </span>

        <span onClick={ () => i18n.changeLanguage("de") } className={`cursor-pointer mx-1 ${ i18n.language != "de" ? "text-slate-700 dark:text-slate-100": "text-blue-500" }`}>
          DE
        </span>
        
 
    
    </React.Fragment>
  )
}, (prev, next) => prev === next)

export default LanguageButton