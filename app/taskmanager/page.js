"use client";
import React, { useEffect, useRef, useState } from "react";
import { Trash2, Plus, User, CalendarIcon, Eye } from "lucide-react";
import { format, isValid, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addTask,
  changedAssignedTo,
  deleteAll,
  deleteSingle,
} from "@/lib/features/task/taskSlice";
import { useRouter } from "next/navigation";

const TodoList = () => {
  const name = useSelector((state) => state.members.names);
  const orgName = useSelector((state) => state.organizationName.orgName);
  const tasks = useSelector((state) => state.task.task);
  const dispatch = useDispatch();
  const router = useRouter()

  const input = useRef();
  const description = useRef()
  const [assignedTo, setAssignedTo] = useState(name[0]); //to track which member is assign initially
  const [date, setDate] = useState(new Date());

  const handleAddTask = () => {
    if (input.current.value) {
      const addingTask = {
        id: uuidv4(),
        task: input.current.value,
        assignedTo: assignedTo,
        deadline: date.toISOString(),
        description: description.current.value,
      };
      dispatch(addTask(addingTask));
      
      description.current.value = ""
      input.current.value = "";
    }
  };
  const selectedWhomToAssign = (event) => {
    const userChanged = event.target.value; //tracking what is selected in dropdown
    setAssignedTo(userChanged);
  };

  const handleDeleteAll = () => {
    dispatch(deleteAll());
  };

  const handleDeleteSingle = (id) => {
    dispatch(deleteSingle(id));
  };

  const taskListDropDown = (event, id) => {
    dispatch(changedAssignedTo([id, event.target.value]));
  };

  const formattedDate = (dateString) => {
    if (!dateString) return "No deadline";
    const date = parseISO(dateString);
    if (isValid(date)) {
      return format(date, "PPP");
    }
    return "Invalid Date";
  };
  const handleViewTask = () => {
    router.push('/listingtask')
  }
  return (
    <div className="min-h-screen p-2 font-serif">
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
                placeholder="Enter Title"
                className="w-full p-3 border border-green-500 rounded-lg  focus:ring-1 focus:ring-green-500 focus:border-green-500 focus:outline-none transition"
                ref={input}
                onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
              />
            </div>
            <div>
              <textarea
                ref={description}
                placeholder="Enter description here"
                className="p-3 border border-green-500 w-full h-48 focus:ring-1 focus:ring-green-500 focus:outline-none rounded-lg "
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
                className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition duration-200 w-1/2 justify-center"
              >
                <Plus size={20} />
                Add Task
              </button>
              <button
                onClick={handleViewTask}
                className="flex items-center gap-2 bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition duration-200 w-1/2 justify-center"
              >
                <Eye size={20} />
                 View Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
