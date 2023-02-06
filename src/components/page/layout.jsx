import React from 'react'
import { AppContext } from '../../contexts'

export const Layout = ({ children }) => { 
  const THEMES = ["dark", "light"]
  const { config, add } = React.useContext(AppContext);

  if(!config?.currentTheme) {
    add({ currentTheme: THEMES[1] })
  }

  return (
    <div className={ `h-[100vh] w-full ${config.currentTheme}` }>
      {children}
    </div>
  )
}

export default Layout