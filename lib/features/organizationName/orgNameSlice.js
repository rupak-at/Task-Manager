import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    orgName: JSON.parse(localStorage.getItem('orgName')) || ''
}

export const organizationNameSlice = createSlice({
    name:'Organization',
    initialState,
    reducers: {
        getOrgName: (state, action)=> {
            state.orgName = action.payload
            localStorage.setItem('orgName', JSON.stringify(action.payload))
        }
    }
})

export const {getOrgName} = organizationNameSlice.actions

export default organizationNameSlice.reducer