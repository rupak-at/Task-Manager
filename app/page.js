"use client";
import { getOrgName } from "@/lib/features/organizationName/orgNameSlice";
import { AlertCircle, ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const getOrganizationName = useRef();
  const dispatch = useDispatch();
  const [error, setError] = useState('')
  const [isValid, setIsValid] = useState(false)
  const router = useRouter();

  const getOrgNameFromUser = () => {
    if (getOrganizationName.current.value.trim() !== "") {
      const name = getOrganizationName.current.value;
      dispatch(getOrgName(name));
      router.push("/getmembers");
    }else{ //small error message if company name field is empty
      setIsValid(true)
      setError('Please Enter Valid Organization Name.')
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-lime-100 flex items-center justify-center p-4 font-serif">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all ">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-lime-100 p-3 rounded-full">
                <ClipboardList className="w-8 h-8 text-lime-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Task Manager
            </h1>
            <p className="text-gray-600">Organize your tasks efficiently</p>
          </div>

          {/* Input Section */}
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Company/Organization Name"
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent focus:bg-white transition-all"
                ref={getOrganizationName}
                onKeyDown={(e) => e.key === "Enter" && getOrgNameFromUser()}
              />
            </div>
            {isValid && 
              <div className="text-red-500 text-sm flex items-center gap-2">
                <span><AlertCircle size={24}/></span>
                {error}
              </div>
            }

            <button
              onClick={getOrgNameFromUser}
              className="w-full px-6 py-3 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-lg transition-all duration-200 ease-in-out shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              Go to Dashboard
            </button>
          </div>

          {/* Footer Section */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Start managing your tasks with ease
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
