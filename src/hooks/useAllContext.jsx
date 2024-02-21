import { createContext, useContext } from "react";

export const AllContext = createContext();

export const useAdminContext = () => {
    const {users, authenticationOfUser,roles}= useContext(AllContext)
 
    return {users, authenticationOfUser,roles}
}
export const useRoleContext = () => {
    const {roles}= useContext(AllContext)
    return {roles}
}

export const useEmployeeContext = () => {
    const {employees} = useContext(AllContext)

    return employees
}

export const useEmployeeOnLeaveContext = () => {
    const {employeesOnLeave} = useContext(AllContext)

    // if(employeesOnLeave === undefined){
    //     throw new Error("useEmployeeContext must be used with a AllContext");
    // }
    return employeesOnLeave
}