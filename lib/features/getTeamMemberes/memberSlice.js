import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    names: JSON.parse(localStorage.getItem('members')) || []
}

export const memberNameSlice = createSlice({
    name: 'Members',
    initialState,
    reducers:{
        addMemberName: (state, action)=>{
            action.payload.forEach((name)=>{
                state.names.push(name)
            })
            localStorage.setItem('members', JSON.stringify(state.names))
        }
    }
})

export const {addMemberName} = memberNameSlice.actions

export default memberNameSlice.reducer