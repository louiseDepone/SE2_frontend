import React from "react";
import ReactDOM from "react-dom/client";
import App from "./TopLevelComponent.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/authentication/Login.jsx";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import ShiftManagerDashboard from "./pages/shiftManager/Dashboard.jsx";
import Employees from "./pages/shiftManager/Employees/Employees.jsx";
import Employee from "./pages/shiftManager/Employees/Employee.jsx";
import PageNoFound from "./PageNoFound.jsx";
import TopLevelComponent from "./TopLevelComponent.jsx";
import ExperimentContext from "./ExperimentContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EmployeeOnLeave from "./pages/shiftManager/Employees/EmployeeOnLeave.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <PageNoFound />,
  },
  {
    path: "/",
    element: <PageNoFound />,
    errorElement: <PageNoFound />,
  },
  {
    path: "/authenticated",
    element: (
      <QueryClientProvider client={queryClient}>
        <ExperimentContext />
      </QueryClientProvider>
    ),
    children: [
      {
        path: "/authenticated/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/authenticated/shiftManager/dashboard",
        element: <ShiftManagerDashboard />,
      },
      {
        path: "/authenticated/shiftManager/employee",
        element: <Employee />,
        children: [
          {
            path: "/authenticated/shiftManager/employee/listOfEmployees",
            element: <Employees />,
          },
          {
            path: "/authenticated/shiftManager/employee/employeeOnLeave",
            element: <EmployeeOnLeave />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
