
import { configureStore } from "@reduxjs/toolkit";
import memberNameSlice from "../membername/teamNameSlice";


export const store = configureStore({
    reducer: memberNameSlice
})