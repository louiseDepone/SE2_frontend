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
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
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
console.log(arrayOfObjects);



export default function Employees() {
    
    const [filterred, setfiltered] = useState([])
    const [items, setItem] = useState([])
      
      useEffect(() => {
        setfiltered(arrayOfObjects)
        setItem(arrayOfObjects)

      },[arrayOfObjects]);


      
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

    reader.onload = (e) => {
      // The result attribute contains the raw CSV data
      const rawCsvData = e.target.result;
      console.log(rawCsvData);
    };

    reader.readAsText(file);
  }
  const colorring = {
    monday : " bg-[#C0DFFD] text-[#56A7F4] ",
    tuesday : " bg-[#D3FDC0] text-[#9CF456]  ",
    wednesday : "bg-[#EDC0FD] text-[#F456D1]  ",
    thursday : " bg-[#FDEFC0] text-[#F4D156]  ",
    friday : "bg-[#C0DFFD] text-[#56A7F4]  ",
    saturday : " bg-[#C8C0FD] text-[#5666F4]  ",
    sunday : " bg-[#E2FDC0] text-[#AEF456]  ",
  }
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
                        if(a.name.toLowerCase().includes(e.target.value.toLowerCase()) || a.crewId.toLowerCase().includes(e.target.value.toLowerCase())){
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
                    <DialogTitle className="text-center py-3 pb-5 font-bold">ADD employee</DialogTitle>
                    {/* <AddUser type="Add"/> */}
                    add employee
                  </DialogHeader>
                </DialogContent>
              </Dialog>
          </div>
        </div>
        <div>
          <Table className="mt-5 bg-white rounded-md">
          <TableHeader>
            <TableRow className="h-14 border-black">
              <TableHead className="text-center">No.</TableHead>
                <TableHead>POSCOD</TableHead>
                <TableHead>CREW ID</TableHead>
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
                <TableRow key={employee.crewId}>
                    <TableCell className='text-center'>{index}</TableCell>
                    <TableCell >{employee.poscod}</TableCell>
                    <TableCell>{employee.crewId}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>
                      <span className='flex space-x-2 '>

                          {employee.timeAvailable.split(",").map((day, index) => {
                            return <span key={day+employee.crewId}
                            className={"text-sm flex justify-center nowrap items-center h-8 w-8 rounded-lg font-bold " + colorring[day.toLowerCase()] }>
                            { day.toLowerCase() === "thursday" || day.toLowerCase() === "sunday" ? day[0] + day[1] : day[0]}
                            </span>
                        })}
                        </span>
                    </TableCell>
                    <TableCell>{employee.hiredDate}</TableCell>
                    <TableCell>
                    <Dialog>
                      <DialogTrigger className=' '>
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
                      <DialogTrigger className=' '>
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
