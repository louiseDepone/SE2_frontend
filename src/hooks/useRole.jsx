import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'


export default function userole() {
    const {data:getrole, refetch:rolerefetch, isLoading:roleLoading} = useQuery({
        queryKey:[`getrole`,123334],
        queryFn: async () => {
            try{
                const data = await axios.get(`http://localhost:3000/roles`,{
                    headers: {
                        authorization: localStorage.getItem(`token`)
                    }
                });
                return data?.data
            }catch(err){
                console.error(`error fetching the role data: `, err)
                return err
            }
        }
    })

    const deleterole = async (id) => {
        try{
            const del = await axios.delete(`http://localhost:3000/role/${id}`, {
                headers:{
                    authorization: localStorage.getItem("token")
                }
            })
            rolerefetch()
            return del.data
        }catch(err){
            console.error(`error registering the role; `, err)
            return err
        }
    }
    const Editrole = async (id,roleData) => {
        try{
            const del = await axios.put(`http://localhost:3000/role/${id}`, roleData, {
                headers:{
                    authorization: localStorage.getItem("token")
                } 
            })
            rolerefetch()
            return del.data
        }catch(err){
            console.error(`error registering the role; `, err)
            return err
        }
    }

    return {getrole, roleLoading,deleterole,Editrole}
}
