import { create } from "zustand";

const useCrewInformation = create((set) => ({
  name: null,
  id: null,
  postcode: null,
  hired_date: null,
  working_area: [],
  availability: {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  },
  // Set method to update the state
  setCrewInfo: (newInfo) => set((state) => ({ ...state, ...newInfo })),
  // Get method to retrieve the state
  getCrewInfo: () => {
    return {
      name: useCrewInformation((state) => state.name),
      working_information: useCrewInformation(
        (state) => state.working_information
      ),
      id: useCrewInformation((state) => state.id),
      postcode: useCrewInformation((state) => state.postcode),
      hired_date: useCrewInformation((state) => state.hired_date),
      working_area: useCrewInformation((state) => state.working_area),
      availability: { ...useCrewInformation((state) => state.availability) },
    };
  },
}));

export default useCrewInformation;
