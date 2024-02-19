import React, { useState } from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Profile } from './Profile'

import useAuth from '@/hooks/useAuth'
import { NavLink } from 'react-router-dom'

export default function NavigationMain({authenticationOfUser}) {

const user = authenticationOfUser

if(!authenticationOfUser) return <></>
  return (
    <div  className={ user?.role_id == 2 ? "flex  items-center justify-evenly bg-white  h-16  space-x-24":"flex  items-center justify-between px-10 bg-white  h-16  space-x-24" }>
        <div className='px-6 bg-white' >LOGO</div>
        { user?.role_id == 2 && 
          <div className="font-medium text-sm flex h-full  items-center space-x-8">
            <NavLink to={"shiftManager/dashboard"} className='hover:border-solid hover:border-b-2  h-full  flex items-center justify-center hover:border-red-500'> Dashboard</NavLink>
            <NavLink to={"shiftManager/employee"} className='hover:border-solid hover:border-b-2  h-full  flex items-center justify-center hover:border-red-500'>Employee</NavLink>
            {/* <NavLink to={"/scheduler/generateschedule"} className='hover:border-solid hover:border-b-2  h-full  flex items-center justify-center hover:border-red-500'>Generate Schedule</NavLink>
            <NavLink to={"/scheduler/workingareas"} className='hover:border-solid hover:border-b-2  h-full  flex items-center justify-center hover:border-red-500'>Working Areas</NavLink> */}
          </div>
        }
        <Profile user_name={user?.name} user_role={user?.role_id}/>
    </div>
  )
}

