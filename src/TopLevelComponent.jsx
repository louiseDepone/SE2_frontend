import { NavLink, Outlet } from 'react-router-dom'
import './App.css'
import useAuth from './hooks/useAuth'
import React, {  useEffect, useState } from 'react'
import {  useAdminContext } from './hooks/useAllContext'
import   NavigationMain from './components/navigation/NavigationMain'
import { Calendar } from "@/components/ui/calendar"

function TopLevelComponent() {
  const {users,authenticationOfUser} = useAdminContext()
  const [date, setDate] = useState(new Date())

  const employeeOnleave = [
    "John Rey Tolosa",
    "Jayson Azuela", 
    "Joshua Mendoza",
    "Rey John Neri",
    "Jhon Mark Fuentes",
    "Maria Gracia Villanueva",
    "Lea Beldad",
    "Ryan Louise Epis", 
    "Jayson Azuela", 
    "Joshua Mendoza",
    "Rey John Neri",
    "Jhon Mark Fuentes",
    "Maria Gracia Villanueva",
    "Lea Beldad",
    "Ryan Louise Epis", 
    "Jayson Azuela", 
    "Joshua Mendoza",
    "Rey John Neri",
    "Jhon Mark Fuentes",
    "Maria Gracia Villanueva",
    "Lea Beldad",
    "Ryan Louise Epis", 
    "Jayson Azuela", 
    "Joshua Mendoza",
    "Rey John Neri",
    "Jhon Mark Fuentes",
    "Maria Gracia Villanueva",
    "Lea Beldad",
    "Ryan Louise Epis", 
  ]
  return (
    <>
    <NavigationMain authenticationOfUser={authenticationOfUser}/>

    {authenticationOfUser?.role_name.toLowerCase() === "schedule manager" ?  <span className='flex '>
            <aside className={`hidden  lg:block bg-white px-6 ppp sticky top-0 h-screen pt-5 `} >
              <Calendar
              mode="single" //8,10,11,14,17
              selected={date}
              onSelect={setDate}
              className="border-b border-gray-200 mb-4 "
            />
            <div className='flex justify-between items-center py-3'>
              <p className="font-bold text-sm">EMPLOYEE ON LEAVE</p>
              <img src="" alt="icon" className='text-xs' />
            </div>
            <div className='text-sm overflow-y-auto h-72 scrollbar-thin'>
              {employeeOnleave.map((leave, index) => {
                return <p className='py-2 pb-2 border-b border-gray-200' key={leave+index}>{leave}</p>
              })}
            </div>
            </aside>
            <Outlet/>
            </span>
    : <Outlet/>
  }
    </>
  )
}

export default TopLevelComponent
