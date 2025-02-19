import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    task: JSON.parse(localStorage.getItem('tasks')) || [
        // {id: '', task: '',deadline: '',assignedTo: ''}
    ]
}

const taskSlice = createSlice({
    name: 'Tasks',
    initialState,
    reducers: {
        addTask: (state, action)=>{//add task in state and localStorage
            state.task.push(action.payload)
            localStorage.setItem('tasks', JSON.stringify(state.task))
        },
        deleteAll: (state) =>{ // removes tasks from everywhere
            state.task = []
            localStorage.removeItem('tasks')
        },
        deleteSingle: (state, action) => {//single task removes by detecting its id and updating
            const upadtedTask = state.task.filter((task)=> task.id !== action.payload)

            state.task = upadtedTask
            localStorage.setItem('tasks', JSON.stringify(upadtedTask))
            
        },
        changedAssignedTo: (state, action)=>{//track the dropdown of task listed and changing the whom to assign
            const [id, userName] = action.payload//by tracking task id

            const updatedTaskChangeUser = state.task.map((task)=>{
                if (task.id === id){
                    return {...task, assignedTo: userName}
                }
                return task
            })
            state.task = updatedTaskChangeUser
            localStorage.setItem('tasks', JSON.stringify(updatedTaskChangeUser))
        }
    }
})

export const {addTask, deleteAll, deleteSingle, changedAssignedTo} = taskSlice.actions

export default taskSlice.reducer