import React from 'react'
import { AuthContext } from '../../contexts'
import { Navbar } from '../navigations'
import { Layout } from './layout'

export const Page = ({ children, className = "", ...rest }) => {

  const { authentication } = React.useContext(AuthContext);
  const { isAuthenticated } = authentication;


  return (
    <Layout>
      <div {...rest} className={`theme__wrapper bg-slate-100 min-h-[100vh] h-auto dark:bg-gray-800 dark:text-slate-100  ${className}`}>
        <Navbar isAuthenticated={isAuthenticated}/>
        {children}
      </div>
    </Layout>
  )
}

export default Page