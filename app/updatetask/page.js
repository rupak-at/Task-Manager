"use client";
import { updateTask } from "@/lib/features/task/taskSlice";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, User } from "lucide-react";
import { format } from "date-fns";

const UpdateTask = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); //getting id from the url
  const tasks = useSelector((state) => state.task.task);
  const teamMembers = useSelector((state) => state.members.names);

  const updatingTask = tasks.find((task) => task.id === id); //getting the task to be updated
  const title = useRef();
  const description = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const [date, setDate] = useState(null); //to get date from task that was provided to it
  const [assignTo, setAssignTo] = useState("");

  useEffect(() => {
    //when the date is updated calender selected date will update as per task deadline
    if (updatingTask.deadline) {
      setDate(updatingTask.deadline);
    }
    if (updatingTask.assignedTo) {
      setAssignTo(updatingTask.assignedTo);
    }
  }, [updatingTask.deadline, updatingTask.assignedTo]);

  const handleSumbit = (e) => {
    e.preventDefault();

    //checking if the date is comming in string or date object then converting into string
    const formattedDate =
      date instanceof Date ? date.toISOString() : new Date(date).toISOString();
      if (!title.current.value.trim()){
        alert('Title Cannot be Empty')
        return
      }
    const task = {
      id: id,
      title: title.current.value,
      description: description.current.value,
      deadline: formattedDate,
      assignedTo: assignTo,
    };
    dispatch(updateTask(task));

    router.push("/listingtask");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 mt-11">
        <form onSubmit={handleSumbit}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  defaultValue={updatingTask.task}
                  className="w-full px-4 py-2 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Task title"
                  ref={title}
                />
              </div>
              <button
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
                type="submit"
              >
                Update Task
              </button>
            </div>
            <div>
              <textarea
                id={updatingTask.id}
                defaultValue={updatingTask.description}
                className="w-full h-60 px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-green-500"
                placeholder="Task description"
                style={{ whiteSpace: "pre-line" }}
                ref={description}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-800">Deadline:</span>
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
            <div className="flex items-center gap-3">
              <User size={26} className="text-green-400" />
              <select
                className="border border-green-500 rounded-3xl w-28 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700 shadow-sm"
                name="members"
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
              >
                {teamMembers.map((member, id) => (
                  <option value={member} key={id}>
                    {member}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
