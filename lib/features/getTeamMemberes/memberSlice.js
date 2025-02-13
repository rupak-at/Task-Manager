import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    names: []
}

export const memberNameSlice = createSlice({
    name: 'Members',
    initialState,
    reducers:{
        addMemberName: (state, action)=>{
            action.payload.forEach((name)=>{
                state.names.push(name)
            })
        }
    }
})

export const {addMemberName} = memberNameSlice.actions

export default memberNameSlice.reducer