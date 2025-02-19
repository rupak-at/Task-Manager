"use client";
import React, { useEffect, useRef, useState } from "react";
import { Trash2, Plus, User, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';


const TodoList = () => {
  const name = useSelector((state) => state.members.names);
  const orgName = useSelector((state) => state.organizationName.orgName);

  const input = useRef();
  const [assignedTo, setAssignedTo] = useState(name[0]); //to track which member is assign initially
  const [date, setDate] = useState(new Date());
  const [todo, setTodo] = useState(JSON.parse(localStorage.getItem('tasks')) || []); //get data from strorage

    const handleAddTask = () => {
      if (input.current.value) {
        const tasks = [
          ...todo,
          {
            id: uuidv4(),
            task: input.current.value,
            AssignedTo: assignedTo.toString(),
            deadline: date.toISOString(),
          },
        ]; //convert date into string
        setTodo(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks))
        input.current.value = "";
      }
    };
    const selectedWhomToAssign = (event) => {
      const userChanged = event.target.value; //tracking what is selected in dropdown
      setAssignedTo(userChanged);
    };
  
    const handleDeleteAll = () => {
      setTodo([]);
      localStorage.removeItem('tasks')
    };
  
    const deleteSingle = (id) => {
      //deleteing single
      const updatedTask = todo.filter((task)=> task.id !== id)
      setTodo(updatedTask)
      localStorage.setItem('tasks', JSON.stringify(updatedTask))
    };
  
    const taskListDropDown = (event, id) => {
      //in task displaying ui tracking user changed and
      console.log(event.target.value);
      const changeUser = event.target.value; //changing that AssignedTo to that change user
      const tasks = todo.map(task => { // Use map to update
        if (task.id === id) {
          return { ...task, AssignedTo: changeUser };
        }
        return task;
      });
      setTodo(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
    
  

  return (
    <div className="min-h-screen p-8 font-serif">
      <div className="max-w-2xl mx-auto p-4 rounded-lg shadow-sm ">
        <h1 className="text-5xl font-bold text-emerald-700 mb-4 text-center">
          {orgName}
        </h1>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Add new task"
                className="w-full p-3 border border-green-500 rounded-lg  focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition"
                ref={input}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
              />
            </div>
            <div className="flex justify-between">
              <div className="relative">
                <span className="text-gray-700">Assigned To: </span>
                <select
                  defaultValue={name[0]}
                  onChange={() => selectedWhomToAssign(event)}
                  className="bg-gray-50 backdrop-filter border border-green-400 rounded-md px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                >
                  {name.map((member, ids) => (
                    <option value={member} key={ids}>
                      {member}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">Deadline:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddTask}
                className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition duration-200"
              >
                <Plus size={20} />
                Add Task
              </button>
              <button
                onClick={handleDeleteAll}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                <Trash2 size={20} />
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {todo.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between gap-4 hover:shadow-md transition duration-200"
            >
              <div className="flex-1 space-y-1">
                <p className="text-gray-800 font-bold">{task.task}</p>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <CalendarIcon size={16} />
                  {format(new Date(task.deadline), "PPP")}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User size={20} className="text-gray-500" />
                  <select
                    className="bg-gray-50 border border-green-400 rounded-md px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                    defaultValue={Array.isArray(task.AssignedTo) ? task.AssignedTo[0] : task.AssignedTo}
                    onChange={() => taskListDropDown(event, task.id)}
                  >
                    {name.map((name, idx) => (
                      <option value={name} key={idx}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => deleteSingle(task.id)}
                  className="text-red-500 hover:text-red-600 transition duration-200"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
