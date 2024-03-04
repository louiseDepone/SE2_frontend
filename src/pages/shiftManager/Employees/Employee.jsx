import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import search from "../../../assets/search.png";
import { Paperclip } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddEmployee from "@/components/forms/structuredForm/AddEmployee";
import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useEmployeeNavigate from "@/store/employeeNavigate";

export default function Employee() {
  const page = useEmployeeNavigate((state) => ({ page: state.page }));
  const { setEmployeeNavigate } = useEmployeeNavigate();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(page);
    if(page.page === "Employee On Leave"){
      navigate("/authenticated/shiftManager/employee/EmployeeOnLeave", {
        replace: true,
      });
    }else{
      navigate("/authenticated/shiftManager/employee/listOfEmployees", {
        replace: true,
      });
    }
  }, []);

  return (
    <div className=" w-full px-8 py-9 ">
      {/* down here is usable component separate this */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-2xl">Employees</p>
          <p className="text-xs text-gray-400 font-thin">{page.page}</p>
        </div>
        <div>
          <div className=" bg-white flex rounded-full">
            <Link
              to={"/authenticated/shiftManager/employee/listOfEmployees"}
              className={`${
                page.page === "List of Employees"
                  ? "bg-[#009BFF] text-white "
                  : " text-black"
              }  hover:bg-[#009BFF] hover:text-white border-white border-4 border-solid rounded-full px-6 py-2 text-sm`}
            >
              Employee Information
            </Link>
            <Link
              to={"/authenticated/shiftManager/employee/employeeOnLeave"}
              className={`${
                page.page === "Employee On Leave"
                  ? "bg-[#009BFF] text-white "
                  : " text-black"
              }  hover:bg-[#009BFF] hover:text-white border-white border-4 border-solid rounded-full px-6 py-2 text-sm`}
            >
              Employee On Leave
            </Link>
          </div>
        </div>
        <div>
          <p className="bg-[#009BFF] text-white  rounded-full px-6 py-2 text-sm ">
            Generate New Schedule
          </p>
        </div>
      </div>
      {/* up here is usable component separate this*/}

      <Outlet />
    </div>
  );
}
