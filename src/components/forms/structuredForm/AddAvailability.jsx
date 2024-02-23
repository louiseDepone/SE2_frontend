import role from '../../../assets/role.png';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React, { useRef } from 'react'
import profile from '../../../assets/profile.png';
import lock from '../../../assets/lock.png';
import num from '../../../assets/num.png';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

const formSchema = z.object({
  idNumber: z.string().min(2).max(50),
})   ;

import  axios from 'axios';
import { useAdminContext, useRoleContext } from '@/hooks/useAllContext';


export default function AddAvailability(props) {

  // const  { roles:{getrole, roleLoading,deleterole,Editrole} } = useRoleContext()
  // const  { users:{EditUser, deleteUser, getuser, registerUser, userLoading, userrefetch}} = useAdminContext()
  const getrole = {
    roles:["name 1","name 2", "name 3","name 4"]
  }
  const EditUser = () => {}
  const deleteUser = () => {}
  const registerUser = () => {}



 const submitbttn = useRef()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: props.account && {
      idNumber: props.account.id_number,
      employeeName:props.account.name,
      role:props.account.role_name,
      password: props.type === "Delete" ? props.account.id_number : '',
    } ||  {
      idNumber: "",
      employeeName:"",
      role:"",
      password:"",
    },
  })
 
  function onSubmit(values) {

    const adminRole = getrole?.roles.find(role => role.role_name ===values.role);
    if(props.type === "Add"){
      registerUser({ name: values.employeeName,
        id_number : values.idNumber,
        password:values.password,
        role_id : adminRole.role_id})
        
      }
      if(props.type === "Modify"){
        EditUser(props.account.user_id,{ name: values.employeeName,
          id_number : values.idNumber,
          password:values.password,
          role_id : adminRole.role_id})
        }
        if(props.type === "Delete"){
          deleteUser(props.account.user_id)
        }
        console.log("submmitter")
        submitbttn.current.parentNode.parentNode.parentNode.classList.replace("fixed","hidden")
        submitbttn.current.parentNode.parentNode.parentNode.previousSibling.classList.replace("fixed","hidden")
        
        

  }
 
  const colorring = {
    m : " bg-[#C0DFFD] text-[#56A7F4] ",
    t : " bg-[#D3FDC0] text-[#9CF456]  ",
    w : "bg-[#EDC0FD] text-[#F456D1]  ",
    th : " bg-[#FDEFC0] text-[#F4D156]  ",
    f : "bg-[#C0DFFD] text-[#56A7F4]  ",
    s : " bg-[#C8C0FD] text-[#5666F4]  ",
    su : " bg-[#E2FDC0] text-[#AEF456]  ",
  }

    return (
      
      <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-[1/2] h-[1/2]">
    
        <FormField 
            control={form.control}
            name="idNumber"
            render={({ field }) => (

           
              <FormItem>
                <table>
                  <thead>
                    <tr>
                      <th>Days</th>
                      <th>Time Available</th>
                    </tr>
                  </thead>
                  <tbody className='availability'>
                   
                   
                    <tr >
                      <td className='py-3 flex justify-between w-44 pr-3'>Sunday <button type="button" className='w-4 h-4 bg-green-500 text-white text-xs'>+</button></td>
                      <td className='space-x-2 w-full'>
                        <div className=' w-full flex space-x-2'>

                        {["7:00 AM - 6:00 PM","4:00 AM - 6:56 PM"].map((i, index) => {
                          return <span key={i+index} className='py-2 px-3  w-fit rounded-md bg-gray-200 flex justify-center items-center'>{i} <button type="button" className='w-4 h-4 ml-3 bg-red-500 text-white text-xs'> x </button></span>
                        })}
                        </div>
                      </td>
                    </tr>
                   
                   
                    <tr >
                      <td className='py-3 flex justify-between w-44 pr-3'>Monday <button type="button" className='w-4 h-4 bg-green-500 text-white text-xs'>+</button></td>
                      <td className='space-x-2 w-full'>
                        <div className=' w-full flex space-x-2'>

                        {["7:00 AM - 6:00 PM","4:00 AM - 6:56 PM"].map((i, index) => {
                          return <span key={i+index} className='py-2 px-3  w-fit rounded-md bg-gray-200 flex justify-center items-center'>{i} <button type="button" className='w-4 h-4 ml-3 bg-red-500 text-white text-xs'> x </button></span>
                        })}
                        </div>
                      </td>
                    </tr>
                   
                   
                    <tr >
                      <td className='py-3 flex justify-between w-44 pr-3'>Tuesday <button type="button" className='w-4 h-4 bg-green-500 text-white text-xs'>+</button></td>
                      <td className='space-x-2 w-full'>
                        <div className=' w-full flex space-x-2'>

                        {["7:00 AM - 6:00 PM","4:00 AM - 6:56 PM"].map((i, index) => {
                          return <span key={i+index} className='py-2 px-3  w-fit rounded-md bg-gray-200 flex justify-center items-center'>{i} <button type="button" className='w-4 h-4 ml-3 bg-red-500 text-white text-xs'> x </button></span>
                        })}
                        </div>
                      </td>
                    </tr>
                   
                   
                    <tr >
                      <td className='py-3 flex justify-between w-44 pr-3'>Wednesday <button type="button" className='w-4 h-4 bg-green-500 text-white text-xs'>+</button></td>
                      <td className='space-x-2 w-full'>
                        <div className=' w-full flex space-x-2'>

                        {["7:00 AM - 6:00 PM","4:00 AM - 6:56 PM"].map((i, index) => {
                          return <span key={i+index} className='py-2 px-3  w-fit rounded-md bg-gray-200 flex justify-center items-center'>{i} <button type="button" className='w-4 h-4 ml-3 bg-red-500 text-white text-xs'> x </button></span>
                        })}
                        </div>
                      </td>
                    </tr>
                   
                   
                    <tr >
                      <td className='py-3 flex justify-between w-44 pr-3'>Thursday <button type="button" className='w-4 h-4 bg-green-500 text-white text-xs'>+</button></td>
                      <td className='space-x-2 w-full'>
                        <div className=' w-full flex space-x-2'>

                        {["7:00 AM - 6:00 PM","4:00 AM - 6:56 PM"].map((i, index) => {
                          return <span key={i+index} className='py-2 px-3  w-fit rounded-md bg-gray-200 flex justify-center items-center'>{i} <button type="button" className='w-4 h-4 ml-3 bg-red-500 text-white text-xs'> x </button></span>
                        })}
                        </div>
                      </td>
                    </tr>
                   
                   
                    <tr >
                      <td className='py-3 flex justify-between w-44 pr-3'>FRIDAY <button type="button" className='w-4 h-4 bg-green-500 text-white text-xs'>+</button></td>
                      <td className='space-x-2 w-full'>
                        <div className=' w-full flex space-x-2'>

                        {["7:00 AM - 6:00 PM","4:00 AM - 6:56 PM"].map((i, index) => {
                          return <span key={i+index} className='py-2 px-3  w-fit rounded-md bg-gray-200 flex justify-center items-center'>{i} <button type="button" className='w-4 h-4 ml-3 bg-red-500 text-white text-xs'> x </button></span>
                        })}
                        </div>
                      </td>
                    </tr>
                   
                   
                    <tr >
                      <td className='py-3 flex justify-between w-44 pr-3'>Saturday <button type="button" className='w-4 h-4 bg-green-500 text-white text-xs'>+</button></td>
                      <td className='space-x-2 w-full'>
                        <div className=' w-full flex space-x-2'>

                        {["7:00 AM - 6:00 PM","4:00 AM - 6:56 PM"].map((i, index) => {
                          return <span key={i+index} className='py-2 px-3  w-fit rounded-md bg-gray-200 flex justify-center items-center'>{i} <button type="button" className='w-4 h-4 ml-3 bg-red-500 text-white text-xs'> x </button></span>
                        })}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

              </FormItem>
            )}/>  

        {props.type == "Delete" ?
        <Button type="submit" ref={submitbttn} className="w-full py-4 bg-gray-200 text-xs">{props.type}</Button>:
        <Button type="submit" ref={submitbttn}  className="w-full py-4 text-xs bg-green-500">{props.type}</Button>}
      </form>
    </Form>



  )
}
