"use client";
import { changedAssignedTo, deleteSingle } from "@/lib/features/task/taskSlice";
import { format } from "date-fns";
import {
  CalendarCheckIcon,
  Plus,
  SquarePlus,
  Trash2,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const ListingTask = () => {
  const taskDetails = useSelector((state) => state.task.task);
  const teamMembers = useSelector((state) => state.members.names);
  const dispatch = useDispatch();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  const handleDeletion = (id) => {
    dispatch(deleteSingle(id));
  };

  const handleChangeAssignTo = (userName, id) => {
    dispatch(changedAssignedTo([id, userName]));
  };

  const handleAddTask = () => {
    router.push("/taskmanager");
  };

  // Filter tasks and when task is not search filter will provide true
  const filteredTasks = useMemo(() => {
    return taskDetails.filter((task) =>
      task.task.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, taskDetails]);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center font-serif bg-gray-100 p-6">
      {/* Title */}
      <h1 className="text-5xl font-bold text-emerald-600 drop-shadow-md mb-4">
        Task List
      </h1>

      {/* Search & Add Task Section */}
      <div className="mt-4 flex justify-between w-full max-w-5xl p-3 bg-white shadow-md rounded-lg border border-gray-200 sticky top-0 backdrop-blur-md bg-opacity-40">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search tasks..."
          className="p-3 border rounded-lg flex-grow border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm text-gray-700"
        />
        <button
          className="ml-4 flex items-center gap-2 bg-green-500 rounded-lg px-4 py-2 text-white hover:bg-green-700 transition-all duration-200 shadow-md"
          onClick={handleAddTask}
        >
          <Plus size={20} /> Add Task
        </button>
      </div>

      {/* Task List Section */}
      <div className="flex flex-col w-full max-w-5xl border p-5 mt-6 bg-white shadow-lg rounded-lg border-green-400">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 border mb-3 bg-gray-50 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              {/* Task Title & Actions */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-emerald-700 underline decoration-2 underline-offset-8">
                  {task.task}
                </h2>
                <div className="flex items-center justify-center">
                  {/* Assign Member Dropdown */}
                  <div className="flex items-center gap-2">
                    <User size={26} className="text-green-400" />
                    <select
                      className="border border-green-500 rounded-3xl w-28 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-700 shadow-sm"
                      name="members"
                      defaultValue={task.assignedTo}
                      onChange={(e) =>
                        handleChangeAssignTo(e.target.value, task.id)
                      }
                    >
                      {teamMembers.map((member, id) => (
                        <option value={member} key={id}>
                          {member}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Delete Button */}
                  <button
                    className="p-2 rounded-lg text-red-500 hover:text-red-800 transition-all duration-200"
                    onClick={() => handleDeletion(task.id)}
                  >
                    <Trash2 size={25} />
                  </button>
                  {/* Update Button */}
                  <button
                    className="p-2 rounded-lg text-blue-500 hover:text-blue-800 transition-all duration-200"
                    onClick={() => handleDeletion(task.id)}
                  >
                    <SquarePlus size={25} />
                  </button>
                </div>
              </div>

              {/* Task Description */}
              <div className="flex mt-3">
                {/* whiteSpace: 'pre-line' shows description as they were written */}
                <p style={{whiteSpace: 'pre-line'}} className="p-3 w-full text-gray-700 break-words rounded-md bg-white border border-gray-300 shadow-sm">
                  {task.description}
                </p>
              </div>

              {/* Task Deadline */}
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-700">
                <CalendarCheckIcon size={20} />
                {format(new Date(task.deadline), "PPP")}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default ListingTask;
