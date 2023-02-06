import React from 'react'
import { Translation } from 'react-i18next'

export const AnonymouseLinks = () => {

  return (
    <li className='flex items-center text-gray-700 hover:text-blue-500'>

      <Link to="/login" className="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <Translation>
            { t => t("LOGIN_LINK") }
          </Translation>
        </button>
      </Link>

    </li>
  )
  
}

export default AnonymouseLinks