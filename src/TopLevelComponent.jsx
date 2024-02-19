import { NavLink, Outlet } from 'react-router-dom'
import './App.css'
import useAuth from './hooks/useAuth'
import {  useEffect, useState } from 'react'
import {  useAdminContext } from './hooks/useAllContext'
import   NavigationMain from './components/navigation/NavigationMain'

function TopLevelComponent() {
  const {users,authenticationOfUser} = useAdminContext()

  return (
    <>
    <NavigationMain authenticationOfUser={authenticationOfUser}/>
      <Outlet/>
    </>
  )
}

export default TopLevelComponent
