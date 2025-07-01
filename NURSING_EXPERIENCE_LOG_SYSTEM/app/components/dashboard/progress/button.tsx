'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const ProgressButton = ({subskill , users , reqSub,reqPro,code}  : any) => {
    const [isOpen,setIsOpen] = useState(false)

    function getMenuClasses() {
        let menuClasses = []

        if(isOpen){
            menuClasses = [
                'columns-2'
            ]
        }else{
            menuClasses.push('hidden')
        }

        return menuClasses.join(" ");
    }

  return (
    <div>
        <button id="dropdownDefaultButton" 
            data-dropdown-toggle="dropdown" 
            className='flex border-2 w-full' type="button" onClick={()=>{setIsOpen(!isOpen)}}>
            <p className='p-3'>{subskill}</p>
        </button>

        <div id="dropdown" className={getMenuClasses()}>
            <div className='font-bold'><p>รายวิชา</p></div>
            <div className='border-2'>
                {users.map((user:any,index:any)=>{
                return(
                    <div key={index}
                    className={user.count[code] >= reqSub ? 'text-green-700' : 'text-red-700'}>
                     <Link href={`/dashboard/progress/${user.id}?name=${user.name}`}>
                        {user.id}
                        {user.name}
                     </Link>   
                    </div>
                )
                })}
            </div>
            <div className='font-bold'><p>หลักสูตร</p></div>
            <div className='border-2' >
                {users.map((user:any,index:any)=>{
                return(
                    <div key={index}
                    className={user.count[code] >= reqPro ? 'text-green-700' : 'text-red-700'}>
                    <Link href={`/dashboard/progress/${user.id}?name=${user.name}`}>
                        {user.id}
                        {user.name}
                     </Link>   
                    </div>
                )
                })}
            </div>
        </div>
    </div>
  )
}

export default ProgressButton