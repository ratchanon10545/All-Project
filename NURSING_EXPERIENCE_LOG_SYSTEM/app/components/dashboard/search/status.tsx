'use client'
import React from 'react'
import styles from './search.module.css'
import { MdSearch } from 'react-icons/md'
import { useRouter } from 'next/navigation'
const Status = [
    {status:"WAIT"},
    {status:"APPROVED"}
  ]

const Status2 = ({search,status}:any) => {
  const router = useRouter()
  const SearchHandle = (status : string) => {
      router.replace(`?search=${search}&status=${status}`)
  }
  return (
    <div className="relative z-0 w-full mb-5 group">
        <label htmlFor="underline_select" className="sr-only">Underline select</label>
        <select defaultValue={status} id="underline_select" onChange={(e)=>SearchHandle(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
            <option value=''>Choose a Status</option>
                {Status.map((status : any,index : any)=>{
                return(
                    <option key={index} value={status.status}>{status.status}</option>
                )
                })}
                        
        </select>
    </div>
  )
}

export default Status2