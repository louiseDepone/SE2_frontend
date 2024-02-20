import { createContext, useContext } from "react";

export const AllContext = createContext();

export const useAdminContext = () => {
    const {users, authenticationOfUser,roles}= useContext(AllContext)

    // if(users === undefined || authenticationOfUser === undefined){
    //     throw new Error("useAdminContext must be used with a AllContext");
    // }
    return {users, authenticationOfUser,roles}
}
export const useRoleContext = () => {
    const {roles}= useContext(AllContext)

    // if(users === undefined || authenticationOfUser === undefined){
    //     throw new Error("useAdminContext must be used with a AllContext");
    // }
    return {roles}
}

export const useEmployeeContext = () => {
    const {employees} = useContext(AllContext)

    // if(user === undefined){
    //     throw new Error("useEmployeeContext must be used with a AllContext");
    // }
    return employees
}

export const useEmployeeOnLeaveContext = () => {
    const {employeesOnLeave} = useContext(AllContext)

    // if(user === undefined){
    //     throw new Error("useEmployeeContext must be used with a AllContext");
    // }
    return employeesOnLeave
}