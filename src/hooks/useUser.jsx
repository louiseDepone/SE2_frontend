import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'


export default function useUser() {
    const {data:getuser, refetch:userrefetch, isLoading:userLoading} = useQuery({
        queryKey:[`userget`,1234],
        queryFn: async () => {
            try{
                const data = await axios.get(`http://localhost:3000/users`,{
                    headers: {
                        authorization: localStorage.getItem(`token`)
                    }
                });
                return data?.data
            }catch(err){
                console.error(`error fetching the user data: `, err)
                return err
            }
        }
    })

    const registerUser = async (accountRegister) => {
        try{
            const add = await axios.post(`http://localhost:3000/user/register`,accountRegister,{
                headers:{
                    authorization: localStorage.getItem("token")
                }
            })
            userrefetch()
            return add.data
        }catch(err){
            console.error(`error registering the user; `, err)
            return err
        }
    }

    const deleteUser = async (id) => {
        try{
            const del = await axios.delete(`http://localhost:3000/user/${id}`, {
                headers:{
                    authorization: localStorage.getItem("token")
                }
            })
            userrefetch()
            return del.data
        }catch(err){
            console.error(`error registering the user; `, err)
            return err
        }
    }
    const EditUser = async (id,userData) => {
        try{
            const del = await axios.put(`http://localhost:3000/user/${id}`, userData, {
                headers:{
                    authorization: localStorage.getItem("token")
                } 
            })
            userrefetch()
            return del.data
        }catch(err){
            console.error(`error registering the user; `, err)
            return err
        }
    }

    return {getuser, userLoading, registerUser,deleteUser,EditUser, userrefetch}
}
