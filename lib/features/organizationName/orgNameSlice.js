import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    orgName: ''
}

export const organizationNameSlice = createSlice({
    name:'Organization',
    initialState,
    reducers: {
        getOrgName: (state, action)=> {
            state.orgName = action.payload
        }
    }
})

export const {getOrgName} = organizationNameSlice.actions

export default organizationNameSlice.reducer