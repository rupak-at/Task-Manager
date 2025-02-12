'use client'
import { addMemberName } from '@/lib/features/getTeamMemberes/memberSlice'
import { getOrgName } from '@/lib/features/organizationName/orgNameSlice'
import Link from 'next/link'
import React, { useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'


const Home = () => {
  const getMemberName = useRef()
  const getOrganizationName= useRef()
  const dispatch = useDispatch()
  const [goTo, setGoTo] = useState(false)

  const memberName = useSelector((state)=> state.members.names)
  const orgName = useSelector((state)=> state.organizationName.orgName)

  const gettingMemberName =  ()=>{
    if(getMemberName.current.value.trim() !== '' && getOrganizationName.current.value.trim() !== ''){
      dispatch(addMemberName(getMemberName.current.value))
      dispatch(getOrgName(getOrganizationName.current.value))
      getOrganizationName.current.value = ''
      getMemberName.current.value = ''
    }
  }
  useEffect(()=>{
    if (memberName.length > 0 && orgName !== ''){
      setGoTo(true)
    }
  },[memberName])

  return (
    <div className="flex flex-col items-center gap-4 p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
      Task Manager
    </h2>
    
    <input type="text" placeholder='Company/Organization Name'
      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
      ref={getOrganizationName}
    />

    <input
      type="text"
      ref={getMemberName}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          gettingMemberName();
        }
      }}
      className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent"
      placeholder="Enter Member Name"
    />
    
    <Link
      href={goTo ? '/taskmanager' : '/'}
      className="w-full px-6 py-3 bg-lime-400 hover:bg-lime-500 text-white font-medium text-center rounded-lg transition-colors duration-200 ease-in-out shadow-sm hover:shadow-md"
    >
      Dashboard
    </Link>
  </div>
  )
}

export default Home