import moment from 'moment'
import React from 'react'

export const CalendarContext = React.createContext(null)

export const CalendarProvider = ({ children }) => {

  const [date, setDate] = React.useState(moment())

  const add       = React.useCallback((amount, unit) => setDate(prev => moment(prev).add(amount, unit)), [])
  const substract = React.useCallback((amount, unit) => setDate(prev => moment(prev).subtract(amount, unit)), [])
  const reload    = React.useCallback(() => setDate(moment()), [])

  return (
    <CalendarContext.Provider value={{ setDate, date, add, substract, reload }}>
      {children}
    </CalendarContext.Provider>
  )
}
