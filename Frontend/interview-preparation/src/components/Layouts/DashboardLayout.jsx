import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import Navbar from './Navbar';

const DashboardLayout = ({children}) => {
  const {user}=useContext(UserContext);
  return (
    <div>
      <Navbar/>
      {user && <div className="pt-4 md:pt-6">{children}</div>}
    </div>
  )
}

export default DashboardLayout;