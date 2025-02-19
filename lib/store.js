import { configureStore } from "@reduxjs/toolkit";
import memberNameReducer from "./features/getTeamMemberes/memberSlice";
import organizationNameReducer from "./features/organizationName/orgNameSlice";
import taskReducer from "./features/task/taskSlice";


export const store = configureStore({
    reducer: {
        members: memberNameReducer,
        organizationName: organizationNameReducer,
        task: taskReducer,
    }
})