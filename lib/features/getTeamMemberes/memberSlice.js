import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    names: []
}

export const memberNameSlice = createSlice({
    name: 'Members',
    initialState,
    reducers:{
        addMemberName: (state, action)=>{
            state.names.push(action.payload)
        }
    }
})

export const {addMemberName} = memberNameSlice.actions

export default memberNameSlice.reducer