import React from 'react'
import config from '../appConfig.json'

const LOCAL_STORAGE_CONTEXT = "APP_CONFIG"

export const AppContext = React.createContext(null)

/**
 * Represents the configuration context for all application
 * @param {children} the children component 
 * @returns Component
 */
export const AppProvider = ({ children }) => {

  const [ appState, setAppState ] = React.useState(config)

  //componentDidMount
  React.useEffect(() => {
    setAppState(localStorage.getItem(LOCAL_STORAGE_CONTEXT) ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_CONTEXT)) : config);
  }, [])

  //componentDidUpdate
  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CONTEXT, JSON.stringify( appState ))
  }, [appState])

  const addConfiguration = React.useCallback((element) => { 
      const newState = {...appState, ...element }
      setAppState(newState)
  })

  const removeConfiguration = React.useCallback((element) => { 
    const newState = {...appState.filter(prop => prop != element)}
    setAppState(newState)
  })

  
  return (
    <AppContext.Provider value={{ add: addConfiguration, remove: removeConfiguration, config: appState  }}>
        {children}
    </AppContext.Provider>
  )
}

export default AppProvider