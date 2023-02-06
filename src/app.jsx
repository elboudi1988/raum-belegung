import React from 'react';
import { AuthContext } from "./contexts"
import { AnonymouseRoutes, AuthenticatedRoutes } from "./pages"

export const App = () => {

  const { authentication } = React.useContext(AuthContext);

  if(authentication.isAuthenticated) {
    return (
      <AuthenticatedRoutes />
    )
  }

  return (
      <AnonymouseRoutes />
  )
}

export default App
