import React, { useEffect } from 'react'
import TopLevelComponent from './TopLevelComponent'
import { AllContext } from './hooks/useAllContext'
import useAuth from './hooks/useAuth';
import useUser from './hooks/useUser';
import { useNavigate } from 'react-router-dom';
import userole from './hooks/useRole';

export default function ExperimentContext() {
    const authenticationOfUser = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if(authenticationOfUser?.role_name.toLowerCase() == "admin"){
       return  navigate("../authenticated/admin/dashboard", {replace: true})
      }
      if(authenticationOfUser?.role_name.toLowerCase() == "schedule manager"){
        return navigate("../authenticated/shiftManager/employee", {replace: true})
      }
    },[authenticationOfUser])

    const users = useUser()// the list and loadind
    const roles = userole() 

  return (
    <AllContext.Provider value={{users,authenticationOfUser,roles}}>
        <TopLevelComponent/>
    </AllContext.Provider>
    )
}
