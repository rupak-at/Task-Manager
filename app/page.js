'use client'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'


const Home = () => {
  const [memberName, setMemberName] = useState(() => JSON.parse(localStorage.getItem('members')) || [])
  const getMemberName = useRef()
  const [goTo, setGoTo] = useState(false)

  
  const gettingMemberName =  ()=>{
    if(getMemberName.current.value.trim() !== ''){
      // dispatch(addMemberName(getMemberName.current.value.trim()))
      setMemberName([...memberName, getMemberName.current.value])
      getMemberName.current.value = ''
    }
  }
  useEffect(()=>{
    if (memberName.length > 0){
      localStorage.setItem('members', JSON.stringify(memberName))
      setGoTo(true)
    }
  },[memberName])

  return (
    <div>
      <input type="text" ref={getMemberName} onKeyDown={(e)=>{
        if(e.key === 'Enter') {
          gettingMemberName()
        }
      }}
      // onChange={(e) => dispatch(setTeamName(e.target.value))}
      className='p-2 border'
      placeholder='Enter Memeber Name'/>

      {
      goTo ? (<Link href='/taskmanager' className='p-2 bg-lime-400 text-white text-center text-xl rounded-lg'>DashBoard</Link>)
      :
      (<Link href={'/'} className='p-2 bg-lime-400 text-white text-center text-xl rounded-lg'>DashBoard</Link>)
      }
    </div>
  )
}

export default Home