import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'


export default function seemployee() {
    const [employeeLoading, setUseLoading] = useState(false)


    const deleteemployee = async (id) => {
        try{
            setUseLoading(true)
            const del = await axios.delete(`http://localhost:3000/employee/${id}`, {
                headers:{
                    authorization: localStorage.getItem("token")
                }
            }).then(() => {
                setUseLoading(false)
            })
         
            return del.data
        }catch(err){
            console.error(`error registering the employee; `, err)
            return err
        }
    }
    const singleEmployee = async (id) => {
        try{
            setUseLoading(true)
            const del = await axios.get(`http://localhost:3000/employee/${id}`, {
                headers:{
                    authorization: localStorage.getItem("token")
                }
            }).then(() => {
                setUseLoading(false)
            })
         
            return del.data
        }catch(err){
            console.error(`error registering the employee; `, err)
            return err
        }
    }
    const Editemployee = async (id,employeeData) => {
        try{
            setUseLoading(true)
            const del = await axios.put(`http://localhost:3000/employee/${id}`, employeeData, {
                headers:{
                    authorization: localStorage.getItem("token")
                } 
            }).then(() => {
                setUseLoading(false)
            })
          
            return del.data
        }catch(err){
            console.error(`error registering the employee; `, err)
            return err
        }
    }

    return { employeeLoading,deleteemployee,Editemployee,singleEmployee}
}
