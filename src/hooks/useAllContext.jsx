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

// export const useEmployeeContext = () => {
//     const [user, role /* list here by comma all the needed for shift manager sch as all the employees,all the role and everything! */] = useContext(AllContext)

//     if(user === undefined){
//         throw new Error("useEmployeeContext must be used with a AllContext");
//     }
//     return user
// }