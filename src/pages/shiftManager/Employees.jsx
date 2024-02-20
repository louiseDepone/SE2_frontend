import React from 'react'
import { Input } from "@/components/ui/input"
import search from "../../assets/search.png"
import { Paperclip } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
export default function Employees() {

const fileInput = (e) => {
  console.log(e)
}
  return (
    <div className=' w-full px-8 pt-14'>

      {/* down here is usable component separate this */}
      <div className='flex justify-between items-center'>
        <div>
          <p className='font-medium text-2xl'>Employees</p>
          <p className='text-xs text-gray-400 font-thin'>List of Employees</p>
        </div>
        <div>
          <p className='bg-[#009BFF] text-white border-white border-4 border-solid rounded-full px-6 py-2 text-sm '>Employee Information</p>
        </div>
        <div>
          <p className='bg-[#009BFF] text-white  rounded-full px-6 py-2 text-sm '>

          Generate New Schedule
          </p>
        </div>

      </div>
      {/* up here is usable component separate this*/}



      <div className='bg-white rounded-md px-7 pt-8 mt-6'>
        <div className='flex justify-between items-center'>
          <div className='flex justify-center items-center  border-gray-200 border rounded-md h-7 pl-3 w-80   '> 
            <img src={search} className='h-5 w-5 ' alt="" /> 
            <Input  placeholder="Search " className="border-none text-sm focus-visible:ring-none h-full"/>
          </div>
         
          <div className='flex items-center gap-4'>
               {/* <input type="file" className='bg-red-500 w-fit h-7 text-sm flex justify-center'  /> */}
               <Input type="file" className='w-44 text-xs h-7 text-center flex f items-center gap-1 border-2 text-[#009BFF] rounded-md px-3 border-[#009BFF] ' 
                onChange={fileInput}
               />
              <Dialog>
                <DialogTrigger className=' flex items-center gap-1 border-2 text-sm text-[#009BFF] rounded-md px-3 border-[#009BFF] h-7'>
                <p className='font-semibold text-xl'> + </p>
                  Add Employee
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center py-3 pb-5 font-bold">ADD employee</DialogTitle>
                    {/* <AddUser type="Add"/> */}
                    add employee
                  </DialogHeader>
                </DialogContent>
              </Dialog>
          </div>
        </div>
        <div>
          TABLE HERE!
        </div>
      </div>
    </div>
  )
}
