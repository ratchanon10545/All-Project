"use client";

import { useRouter} from 'next/navigation'
import React, { useState } from 'react'

export default function SubmitComment({session , video_id , onAddData} : {session : any , video_id:string , onAddData : () => void}) {
    const [input , setInput] = useState('')
    const [isFocus , setIsFocus] = useState(false)

    const router = useRouter()
    // console.log(session)
    const signin = () =>{
        router.push("?modal=true", { scroll: false });
    }

    const handlecancle = () =>{
        setInput('')
        setIsFocus(false)
    }

    const handleSubmit = async () => {
        if(input){
            const res = await fetch(`/api/comment/${video_id}`,{
                method: "POST",
                body: JSON.stringify({ content :input , user_id : session.user.user_id }),
        })
            if(res.ok){
                setInput('')
                setIsFocus(false)
                router.refresh()
                return onAddData();
            }
            return false
        }
        else{
            return null
        }
    }

  return (
    <div>
        {session ? 
        <div className='flex'>
            <img src={session.user.profilePicture} className='h-9 w-9 rounded-full' alt="" />
            <div className='w-full pl-5'>
                <input type="text" onClick={() => setIsFocus(true)} 
                className=' w-full border-b focus:border-b-2 focus:border-black focus:outline-none text-sm' 
                placeholder='Add Comment'
                value={input}
                onChange={(e) => setInput(e.target.value)}/>
                {isFocus &&
                <div className='flex justify-end space-x-4 mt-2'>
                    <div onClick={handlecancle} className='rounded-xl cursor-pointer py-1 px-5 hover:bg-gray-100'>Cancle</div>
                    <div onClick={handleSubmit} className='rounded-xl cursor-pointer bg-black text-white py-1 px-5'>Submit</div>
                </div>
                }
            </div>
        </div>:
        <div className='flex justify-center'>
            Please<div onClick={signin} className='ml-2 hover:underline text-blue-500 cursor-pointer'> Sign In</div>
        </div>}
    </div>
  )
}
