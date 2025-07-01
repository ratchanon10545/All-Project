'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation'
type Inputs = {
    id : number
    Place:string
  }

const Modifyplace = ({place}:any) => {
    const router = useRouter()
    const [oldid,serOldid] = useState(place.id)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>({ defaultValues:place})
      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const listdata={
            ...data,
            oldid
        }
        
        await axios.put('/api/modifyplace',listdata)
        router.push('/dashboard/places')
        }  
    return (
        <div className='p-5'>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>

                <div className="relative z-0 w-full mb-5 group">
                    <input  {...register('id', { required: true })} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    <label htmlFor="floating_Name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        ID</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input  {...register('Place', { required: true })} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    <label htmlFor="floating_Name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Place</label>
                </div>
                
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
      )
}

export default Modifyplace