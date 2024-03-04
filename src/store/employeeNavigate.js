import { create } from "zustand";

const useEmployeeNavigate = create((set) => ({
  page: "List of Employees",
  setEmployeeNavigate: (navigate) => {
    // Corrected key name
    set({ page: navigate });
  },
}));

export default useEmployeeNavigate;
