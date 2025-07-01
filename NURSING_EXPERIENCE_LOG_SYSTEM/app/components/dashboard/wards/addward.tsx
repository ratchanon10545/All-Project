'use client'
import axios from 'axios'
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation'
type Inputs = {
    ward:string,
    placeid:number
  }

const Addward = ({places}:any) => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>()
      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await axios.post('/api/addward',data)
        router.push('/dashboard/wards')
        }   
    return (
        <div className='p-5'>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
                
                <div className="relative z-0 w-full mb-5 group">
                    <input  {...register('ward', { required: true })} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    <label htmlFor="floating_Name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Ward</label>
                </div>
    
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="underline_select" className="sr-only">Underline select</label>
                    <select  {...register('placeid', { required: true })} id="underline_select" 
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-700 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                        <option value=''>Choose a Place</option>
                        {places.map((place : any,index : any)=>{
                            return(
                                <option key={index} value={place.id}>{place.Place}</option>
                            )
                        })}
                        
                    </select>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
      )
}

export default Addward