import moment from 'moment'
import React from 'react'
import { useContext } from 'react'
import { CalendarContext } from '../../contexts'

export const MonthView = () => {

  const { date } = useContext(CalendarContext)

  return (
    <div className={`dark:text-slate-100 text-slate-600 ${ moment(date).month() === moment().month() ? "": "" }`}>
      <span className={ `hidden sm:block ${ moment(date).month() === moment().month() ? "text-green-700 font-bold dark:text-green-300": "" }` }>{ moment(date).format("MMMM") }</span>
      <span className={ `sm:hidden block ${ moment(date).month() === moment().month() ? "text-green-700 font-bold dark:text-green-300": "" }` }>{ moment(date).format("MMM") }</span>
    </div>
  )
}

export default MonthView