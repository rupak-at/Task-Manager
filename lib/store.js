import { configureStore } from "@reduxjs/toolkit";
import memberNameReducer from "./features/getTeamMemberes/memberSlice";
import organizationNameReducer from "./features/organizationName/orgNameSlice";


export const store = configureStore({
    reducer: {
        members: memberNameReducer,
        organizationName: organizationNameReducer
    }
})