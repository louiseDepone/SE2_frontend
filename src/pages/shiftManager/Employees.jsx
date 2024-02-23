import React, { useEffect, useState } from 'react'
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AddEmployee from '@/components/forms/structuredForm/AddEmployee'
import axios from 'axios'
import { useEmployeeContext } from '@/hooks/useAllContext'
import { set } from 'date-fns'
function getRandomDays(daysOfWeek) {
  const randomDaysCount = Math.floor(Math.random() * daysOfWeek.length) + 1;
  const shuffledDays = daysOfWeek.sort(() => Math.random() - 0.5);
  return shuffledDays.slice(0, randomDaysCount);
}

function getRandomDate() {
  const randomMonth = Math.floor(Math.random() * 12) + 1;
  const randomDay = Math.floor(Math.random() * 28) + 1; // Assuming all months have 28 days for simplicity
  const randomYear = 2023; // You can adjust the range of years as needed

  return `${getMonthName(randomMonth)} ${randomDay}, ${randomYear}`;
}

function getMonthName(monthNumber) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[monthNumber - 1];
}

function generateRandomName() {
  const firstNames = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank", "Grace", "Henry", "Ivy", "Jack"];
  const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"];

  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return {
    firstName: randomFirstName,
    lastName: randomLastName,
    fullName: `${randomFirstName} ${randomLastName}`
  };
}

function generateArrayOfObjects(count) {
  const daysOfWeek = ["M", "T", "W", "Th", "F", "S", "Su"];
  const objectsArray = [];

  for (let i = 0; i < count; i++) {
    const randomDays = getRandomDays(daysOfWeek);
    const randomDate = getRandomDate();
    const randomName = generateRandomName();

    const newObj = {
      poscod: "crew",
      crewId: `21-${Math.floor(Math.random() * 100000)}`, // Random crewId
      firstName: randomName.firstName,
      lastName: randomName.lastName,
      name: randomName.fullName,
      timeAvailable: randomDays.join(','),
      hiredDate: randomDate,
    };

    objectsArray.push(newObj);
  }

  return objectsArray;
}

// Usage example: Generate an array of 5 objects
const arrayOfObjects = generateArrayOfObjects(30);



export default function Employees() {

    const {employeeLoading,deleteemployee,Editemployee,singleEmployee} = useEmployeeContext()
    
    const [isLoading, setIsloadin]= useState(false)
    const [filterred, setfiltered] = useState([])
    const [items, setItem] = useState([])
      {}
    const getemployee = async () => {
        setIsloadin(true)
        try{
            const del = await axios.get(`http://localhost:3000/employee/all`, {
                headers:{
                    authorization: localStorage.getItem("token")
                }
            }).then(e => {
                  setfiltered(e?.data);
                  setItem(e?.data);
                  setIsloadin(false)

            })
        }catch(err){
            console.error(`error registering the user; `, err)
            return err
        }
    }
    
    useEffect(() => {
      getemployee()
    },[isLoading]);
      
    let itemsqueryPerPage = 7
    let maxPagesShown = 3
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(filterred?.length / itemsqueryPerPage);

    const pageRange = Math.min(totalPages, maxPagesShown);

    let startPage = Math.max(currentPage - Math.floor(pageRange / 2), 1);
    let endPage = startPage + pageRange - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - pageRange + 1, 1);
    }
    const currentItemsquery = filterred?.slice((currentPage - 1) * itemsqueryPerPage, currentPage * itemsqueryPerPage);
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
    const handleNextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
  const fileInput = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    const csvquery = async (data) => {
      const fetch = await axios.post("http://localhost:3000/csv/import-csv",{data: data},{
        headers:{
          authorization: localStorage.getItem("token")
      }
      }).then(response => {
        setIsloadin(true)
    })}

    reader.onload = (e) => {
      const rawCsvData = e.target.result;
      csvquery(rawCsvData)
      // console.log(rawCsvData)
    };

    reader.readAsText(file);
  }
  const colorring = ['',
   " bg-[#C0DFFD] text-[#56A7F4] ",
    " bg-[#D3FDC0] text-[#9CF456]  ",
     "bg-[#EDC0FD] text-[#F456D1]  ",
    " bg-[#FDEFC0] text-[#F4D156]  ",
    "bg-[#C0DFFD] text-[#56A7F4]  ",
     " bg-[#C8C0FD] text-[#5666F4]  ",
    " bg-[#E2FDC0] text-[#AEF456]  ",
  ]
  const daysOfWeek = ["","M", "T", "W", "Th", "F", "S", "Su"];
  return (
    <div className=' w-full px-8 py-9 '>

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



      <div className='bg-white rounded-md px-7 pt-7 mt-6'>
        <div className='flex justify-between items-center'>
          <div className='flex justify-center items-center  border-gray-200 border rounded-md h-7 pl-3 w-80   '> 
            <img src={search} className='h-5 w-5 ' alt="" /> 
            <Input  placeholder="Search " className="border-none text-sm focus-visible:ring-none h-full"  onChange={(e) => {
                    if(e.target.value.trim() == ""){
                      setfiltered(items)
                    } 
                    setfiltered(
                      items.filter(a => {
                        const d =  a?.identification_number.toString().includes(e.target.value.toLowerCase())
                        if(a.person_name.toLowerCase().includes(e.target.value.toLowerCase()) || d
                        
                        ){
                          return true
                        }
                        return false
                      })
                    )
                }}/>
          </div>
         
          <div className='flex items-center gap-4'>

               <input type="file" accepts=".csv" className='w-28' onChange={fileInput}/>
              <Dialog>
                <DialogTrigger className=' flex items-center gap-1 border-2 text-sm text-[#009BFF] rounded-md px-3 border-[#009BFF] h-7 '>
                <p className='font-semibold text-xl'> + </p>
                  Add Employee
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center py-3 pb-5 font-bold">CREW INFORMATION</DialogTitle>
                    {/* <AddUser type="Add"/> */}
                    <AddEmployee type="ADD" />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
          </div>
        </div>
        <div>
          <Table className="mt-5 bg-white rounded-md">
          <TableHeader>
            <TableRow className="h-14 border-black">
                <TableHead>CREW ID</TableHead>
                <TableHead>POSCOD</TableHead>
                <TableHead>NAME</TableHead>
                <TableHead>TIME AVAILABLE</TableHead>
                <TableHead>HIRED DATE</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
            </TableRow>
          </TableHeader> 
          <TableBody >
            {currentItemsquery?.map((employee, index) => {
              return (
                <TableRow key={employee.crewId +index }>
                    {/* <TableCell className='text-center'>{items.indexOf(employee)}</TableCell> */}
                    <TableCell>{employee.identification_number}</TableCell>
                    <TableCell >{employee.poscod}</TableCell>
                    <TableCell>{employee.person_name}</TableCell>
                    <TableCell>
                      <span className='flex space-x-2 '>
                          
                           { employee?.day_ids ?
                          
                          [...new Set(employee?.day_ids.split(","))].map((day, index)=>{
                            return <span key={day+employee.identification_number}
                              className={"text-sm flex justify-center nowrap items-center h-8 w-8 rounded-lg font-bold " + colorring[day] }>
                                {daysOfWeek[day]}
                              </span>
                          })
                          :
                          <span className='text-xs text-gray-400'>No time Available set</span>
                        } 
                        </span>
                    </TableCell>
                    <TableCell>{employee.hired_date}</TableCell>
                    <TableCell className="flex gap-2  ">
                    <Dialog>
                      <DialogTrigger className='flex gap-1'>
                        <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.625 3.95006L12.0505 0.374992C11.9317 0.256107 11.7906 0.1618 11.6352 0.0974584C11.4799 0.0331166 11.3135 0 11.1453 0C10.9772 0 10.8107 0.0331166 10.6554 0.0974584C10.5001 0.1618 10.359 0.256107 10.2401 0.374992L0.375211 10.2402C0.255833 10.3586 0.161187 10.4996 0.0967749 10.6549C0.0323627 10.8103 -0.000530757 10.9768 6.47604e-06 11.145V14.72C6.47604e-06 15.0595 0.134865 15.3851 0.374914 15.6251C0.614964 15.8651 0.94054 16 1.28002 16H4.85526C5.02342 16.0005 5.19 15.9676 5.34534 15.9032C5.50067 15.8388 5.64164 15.7442 5.76007 15.6248L15.625 5.76039C15.7439 5.64153 15.8382 5.50041 15.9025 5.3451C15.9669 5.18979 16 5.02333 16 4.85522C16 4.68711 15.9669 4.52065 15.9025 4.36534C15.8382 4.21003 15.7439 4.06891 15.625 3.95006ZM1.54482 10.8802L8.77291 3.65247L10.1073 4.98762L2.88004 12.2145L1.54482 10.8802ZM1.28002 12.4249L3.57525 14.72H1.28002V12.4249ZM5.12007 14.4553L3.78485 13.1201L11.0129 5.89238L12.3474 7.22753L5.12007 14.4553Z" fill="black"/>
</svg>

                        </span>
                        Edit
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-center py-3 pb-5 font-bold">edit employee</DialogTitle>
                          {/* <AddUser type="Add"/> */}
                          edit employee
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                    <DialogTrigger className='flex gap-1 text-[#EC1608]'>
                        <span>
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.9583 2.46154H10.25V1.84615C10.25 1.35652 10.0788 0.886947 9.77405 0.540726C9.4693 0.194505 9.05598 0 8.625 0H5.375C4.94402 0 4.5307 0.194505 4.22595 0.540726C3.9212 0.886947 3.75 1.35652 3.75 1.84615V2.46154H1.04167C0.898008 2.46154 0.760233 2.52637 0.658651 2.64178C0.557068 2.75719 0.5 2.91371 0.5 3.07692C0.5 3.24013 0.557068 3.39666 0.658651 3.51207C0.760233 3.62747 0.898008 3.69231 1.04167 3.69231H1.58333V14.7692C1.58333 15.0957 1.69747 15.4087 1.90063 15.6395C2.1038 15.8703 2.37935 16 2.66667 16H11.3333C11.6207 16 11.8962 15.8703 12.0994 15.6395C12.3025 15.4087 12.4167 15.0957 12.4167 14.7692V3.69231H12.9583C13.102 3.69231 13.2398 3.62747 13.3414 3.51207C13.4429 3.39666 13.5 3.24013 13.5 3.07692C13.5 2.91371 13.4429 2.75719 13.3414 2.64178C13.2398 2.52637 13.102 2.46154 12.9583 2.46154ZM5.91667 11.6923C5.91667 11.8555 5.8596 12.012 5.75802 12.1275C5.65643 12.2429 5.51866 12.3077 5.375 12.3077C5.23134 12.3077 5.09357 12.2429 4.99198 12.1275C4.8904 12.012 4.83333 11.8555 4.83333 11.6923V6.76923C4.83333 6.60602 4.8904 6.4495 4.99198 6.33409C5.09357 6.21868 5.23134 6.15385 5.375 6.15385C5.51866 6.15385 5.65643 6.21868 5.75802 6.33409C5.8596 6.4495 5.91667 6.60602 5.91667 6.76923V11.6923ZM9.16667 11.6923C9.16667 11.8555 9.1096 12.012 9.00802 12.1275C8.90643 12.2429 8.76866 12.3077 8.625 12.3077C8.48134 12.3077 8.34357 12.2429 8.24198 12.1275C8.1404 12.012 8.08333 11.8555 8.08333 11.6923V6.76923C8.08333 6.60602 8.1404 6.4495 8.24198 6.33409C8.34357 6.21868 8.48134 6.15385 8.625 6.15385C8.76866 6.15385 8.90643 6.21868 9.00802 6.33409C9.1096 6.4495 9.16667 6.60602 9.16667 6.76923V11.6923ZM9.16667 2.46154H4.83333V1.84615C4.83333 1.68294 4.8904 1.52642 4.99198 1.41101C5.09357 1.2956 5.23134 1.23077 5.375 1.23077H8.625C8.76866 1.23077 8.90643 1.2956 9.00802 1.41101C9.1096 1.52642 9.16667 1.68294 9.16667 1.84615V2.46154Z" fill="#EC1608"/>
</svg>


                        </span>
                        Delete
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-center py-3 pb-5 font-bold">Delete employee</DialogTitle>
                          {/* <AddUser type="Add"/> */}
                          Delete employee
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                    </TableCell>
                  </TableRow>
              )
            })}
          </TableBody>
        </Table>

         
        <div className='flex justify-between px-5 pt-4 text-xs'>
          <div>shwowing {currentItemsquery?.length} out of {filterred?.length}</div>
            <div className='space-x-6'>
              <button className='hover:bg-gray-600 p-2 rounded-md hover:text-white' onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>

              {startPage > 1 && (
                <React.Fragment>
                  <button className='hover:bg-gray-600 w-8 h-8 rounded-md hover:text-white' onClick={() => handlePageChange(1)}>
                    1
                  </button>
                  {startPage > 2 && <span>...</span>}
                </React.Fragment>
              )}

              {Array.from({ length: pageRange }).map((_, index) => (
                <button className='hover:bg-gray-600 w-8 h-8 rounded-md hover:text-white' key={index} onClick={() => handlePageChange(startPage + index)}>
                  {startPage + index}
                </button>
              ))}

              {endPage < totalPages - 1 && <span>...</span>}

              {endPage < totalPages && (
                <React.Fragment>
                  {endPage < totalPages && (
                    <button className='hover:bg-gray-600 w-8 h-8 rounded-md hover:text-white' onClick={() => handlePageChange(totalPages)}>
                      {totalPages}
                    </button>
                  )}
                </React.Fragment>
              )}

              <button className='hover:bg-gray-600 p-2 rounded-md hover:text-white' onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
        </div>
          
        </div>
      </div>
    </div>
  )
}
