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
  employeeName: z.string().min(2).max(50),
  role: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
  confirmPassword: z.string().min(2).max(50),
})    .refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

import  axios from 'axios';
import { useAdminContext, useRoleContext } from '@/hooks/useAllContext';
import AddAvailability from './AddAvailability';


export default function AddEmployee(props) {

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

    const adminRole = getrole?.roles.find(role => role.role_name === values.role);
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
    
        <p>Personal Information</p>
        <FormField 
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem>
                <div className='flex border-gray-300 border-b justify-between items-center '>
                <FormLabel className="font-semibold text-nowrap "> Name</FormLabel>
                  <FormControl className="w-[75%]">
                    { props.type == "Delete" ? 
                    <Input disabled placeholder="Crew Full Name" className="border-0 border-transparent outline-none ring-0 ring-opacity-0 focus-visible:ring-0 shadow-none border-none ring-none h-full "/> :
                    <Input placeholder="Crew Full Name" className="border-0 border-transparent outline-none ring-0 ring-opacity-0 focus-visible:ring-0 shadow-none border-none ring-none h-full" />}
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}/>  

        <p className='pt-5'> Working Information</p>
        <FormField 
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem>
                <div className='flex border-gray-300 border-b justify-between items-center '>
                <FormLabel className="font-semibold text-nowrap "> ID</FormLabel>
                  <FormControl className="w-[75%]">
                    { props.type == "Delete" ? 
                    <Input disabled placeholder="Crew Full Name" className="border-0 border-transparent outline-none ring-0 ring-opacity-0 focus-visible:ring-0 shadow-none border-none ring-none h-full "/> :
                    <Input placeholder="Crew Identification Number" className="border-0 border-transparent outline-none ring-0 ring-opacity-0 focus-visible:ring-0 shadow-none border-none ring-none h-full" />}
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}/>  

        <FormField 
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem>
                <div className='flex border-gray-300 border-b justify-between items-center '>
                <FormLabel className="font-semibold text-nowrap "> POSCOD </FormLabel>
                  <FormControl className="w-[75%]">
                    { props.type == "Delete" ? 
                    <Input disabled placeholder="Crew Full Name" type="date" className="border-0 border-transparent outline-none ring-0 ring-opacity-0 focus-visible:ring-0 shadow-none border-none ring-none h-full "/> :
                    <Input placeholder="Crew Position Code"  className="border-0 border-transparent outline-none ring-0 ring-opacity-0 focus-visible:ring-0 shadow-none border-none ring-none h-full" />}
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}/>  


        <FormField 
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem>
                <div className='flex border-gray-300 border-b justify-between items-center '>
                <FormLabel className="font-semibold text-nowrap "> Hired Date </FormLabel>
                  <FormControl className="w-[75%]">
                    { props.type == "Delete" ? 
                    <Input disabled placeholder="Crew Full Name" type="date" className="border-0 border-transparent outline-none ring-0 ring-opacity-0 focus-visible:ring-0 shadow-none border-none ring-none h-full "/> :
                    <Input placeholder="Crew Identification Number" type="date" className="border-0 border-transparent outline-none ring-0 ring-opacity-0 focus-visible:ring-0 shadow-none border-none ring-none h-full" />}
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}/>  
       
       <FormField
            control={form.control}
            name="role" 
            render={({ field }) => (
              <FormItem className="flex border-gray-300 border-b justify-between items-center ">
                <FormLabel className="font-semibold text-nowrap">Working Area</FormLabel>
                <FormControl>
                <div className='flex items-center w-[75%] '>
                  {props.type == "Delete" ? 
                    <Select disabled onValueChange={field.onChange} defaultValue={field.value.role_id}  value={field.value.role_id} >
                    <SelectTrigger classList="border-none h-full" >
                      <div className='flex'>
                    
                      <SelectValue placeholder={field.value || "Role"} />
                      </div>
                    </SelectTrigger>
                    <SelectContent >
                    {getrole?.roles.map((rol, index) => {
                        return <SelectItem key={index.toString()} value={rol.role_name}>{rol.role_name}</SelectItem>;
                    })}
                    </SelectContent> 
                  </Select>
                  :
                  
                <Select  className="ring-green-500" onValueChange={field.onChange} defaultValue={field.value.role_id}   value={field.value.role_id} >
                  <SelectTrigger  className="border-none h-full focus-visible:ring-none"  >
    
                    <div className='pb-2 text-gray-500'>
                   
                    <SelectValue placeholder={field.value || "Crew Working Area"} />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {getrole?.roles?.map((rol, index) => {
                        return <SelectItem key={index.toString()} value={rol.role_name}>{rol.role_name}</SelectItem>;
                    })}
                    </SelectContent> 
                       
                </Select>
                  }
                
                <FormMessage />
                </div>
                </FormControl>
              </FormItem>
            )}
          />



      
<FormField
            control={form.control}
            name="role" 
            render={({  }) => (
              <FormItem className="flex border-gray-300 border-b justify-between items-center ">
                <FormLabel className="font-semibold text-nowrap">Availability</FormLabel>
                <FormControl>
                <div className='flex items-center w-[75%] space-x-2 pb-2'>
                  {
                    ["M","T","W","TH","F","S","SU"].map((day, index ) => {
                        return <span key={day+index+index+1} className={'text-sm flex justify-center nowrap items-center h-8 w-8 rounded-lg font-bold ' + colorring[day.toLowerCase()] }>{day}</span>
                    })
                    
                  }
                  <Dialog className="">
                      <DialogTrigger >
                        Edit
                      </DialogTrigger>
                      <DialogContent className="w-[80%]"  >
                        <DialogHeader>
                          <DialogTitle className="text-center py-3 pb-5 font-bold">Crew Time Availability</DialogTitle>
                          <AddAvailability type="Add"/>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                </div>
                </FormControl>
                
              </FormItem>
            )}
          />






        {props.type == "Delete" ?
        <Button type="submit" ref={submitbttn} className="w-full py-4 bg-red-500 text-xs">{props.type}</Button>:
        <Button type="submit" ref={submitbttn}  className="w-full py-4 text-xs bg-green-500">{props.type}</Button>}
      </form>
    </Form>



  )
}
