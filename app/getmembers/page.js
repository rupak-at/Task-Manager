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

		dispatch(addMemberName(memberNames))

    router.push('/taskmanager')
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-blue-500" />
            <CardTitle>Team Member Registration</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="team-size">Team Size</Label>
            <select
              id="team-size"
              value={teamNumber}
              onChange={(e) => setTeamNumber(e.target.value)}
              className="w-full p-2 border rounded-md bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? "Member" : "Members"}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <Label>Team Members</Label>
            {memberNames.map((name, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="flex-none w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 font-semibold">
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    handleMemberNameChange(index, e.target.value)
                  }
                  placeholder={`Member ${index + 1} name`}
                  className="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-600 text-white"
          >
            Submit Team Members
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default GetMemberName;
