import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'


export default function useUser() {
    const [userLoading, setUseLoading] = useState(false)
 
    const registerUser = async (accountRegister) => {
        try{
            setUseLoading(true)
            const add = await axios.post(`http://localhost:3000/user/register`,accountRegister,{
                headers:{
                    authorization: localStorage.getItem("token")
                }
            })
            console.log("submmitter")
            setUseLoading(false)
            //userrefetch()
            return add?.data
        }catch(err){
            console.error(`error registering the user; `, err)
            
            return err
        }
    }

    const deleteUser = async (id) => {
        try{
            setUseLoading(true)
            const del = await axios.delete(`http://localhost:3000/user/${id}`, {
                headers:{
                    authorization: localStorage.getItem("token")
                }
            })
            //userrefetch()
            setUseLoading(false)

            return del?.data
        }catch(err){
            console.error(`error registering the user; `, err)
            return err
        }
    }
   
    const EditUser = async (id,userData) => {
        try{
            setUseLoading(true)
            const del = await axios.put(`http://localhost:3000/user/${id}`, userData, {
                headers:{
                    authorization: localStorage.getItem("token")
                } 
            })
            
            setUseLoading(false)
            

            return del?.data
        }catch(err){
            console.error(`error registering the user; `, err)
            // return err
        }
    }

    return { userLoading, registerUser,deleteUser,EditUser,}
}
