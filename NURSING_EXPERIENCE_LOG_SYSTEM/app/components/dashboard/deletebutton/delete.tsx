'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

const Delete =  ({id,path}:any) => {
  const router = useRouter()
  const deleteHandle = async () =>{
    await axios.delete(`${path}/${id}`)
    router.refresh()
  }
  return (
    <button  type="button" onClick={deleteHandle}
      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
    ลบ</button>
  )
}

export default Delete