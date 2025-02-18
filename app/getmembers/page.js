"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useDispatch } from "react-redux";
import { addMemberName } from "@/lib/features/getTeamMemberes/memberSlice";
import { useRouter } from "next/navigation";

const GetMemberName = () => {
	const dispatch = useDispatch()
  const router = useRouter()
  const [teamNumber, setTeamNumber] = useState(1);
  const [memberNames, setMemberNames] = useState(Array(1).fill(""));
  const [nameError, setNameError] = useState(false)

  const handleMemberNameChange = (index, value) => {
    const newNames = [...memberNames];
    newNames[index] = value;
    setMemberNames(newNames);
  };

  useEffect(() => {
    setMemberNames((prev) => {
      const newArray = Array(parseInt(teamNumber)).fill("");
      return newArray.map((_, index) => prev[index] || "");
    });
  }, [teamNumber]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const checkForEmptyName = memberNames.every((member)=> member !== '')

    if (!checkForEmptyName) {
      setNameError(true)
      return
    }
    setNameError(false)
		dispatch(addMemberName(memberNames))

    router.push('/taskmanager')
  };

  return (
    <div className="w-full h-screen flex justify-center font-serif bg-gradient-to-br from-lime-50 to-lime-100">
      <form onSubmit={handleSubmit} className="mt-7">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-4">
              <Users className="h-12 w-12 text-green-500" />
              <CardTitle className={`text-4xl`}>Team Member Registration</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team-size" className='text-xl'>Team Size</Label>
              <select
                id="team-size"
                value={teamNumber}
                onChange={(e) => setTeamNumber(e.target.value)}
                className="w-full p-2 border border-green-500 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? "Member" : "Members"}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <div className="flex flex-col">
                <Label className='text-xl'>Team Members</Label>
                {nameError && <span className="text-red-500">Every Name Filled Has To Be Filled</span>}

              </div>
              {memberNames.map((name, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex-none w-8 h-8 flex items-center justify-center bg-green-200 rounded-full text-gray-800 font-semibold">
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      handleMemberNameChange(index, e.target.value)
                    }
                    placeholder={`Member ${index + 1} Name`}
                    className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-900 text-white"
            >
              Submit Team Members
            </Button>
          </CardFooter>
        </Card>
      </form>

    </div>
  );
};

export default GetMemberName;
