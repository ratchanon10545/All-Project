'use client'

import { Button } from '@radix-ui/themes'
import { Elsie_Swash_Caps } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import {Switch} from "@nextui-org/react";

const listtype = [
    {id : 1 , type: "รออนุมัติ",typeeng:"WAIT"},
    {id : 0 , type: "อนุมัติ",typeeng:"APPROVED"}
]

interface Props {
    data : any
    subskills : any
}
type Inputs = {
  search : string
}


const Viewlog = ({
    data,
    subskills}: Props , {params,searchParams}:any) => {
    
    const [selectedOption, setSelectedOption] = useState("");
    const [results, setResults] = useState([]);
    const [results2, setResults2] = useState([]);
    const datas = data.log
    const router = useRouter()
    
    const handleOptionChange = (status: any) => {
        // const _id = parseInt(id)
        setSelectedOption(status);
        const dt = datas.filter((x:{Status: string}) => x.Status === status)
        setResults(dt)
        setResults2(dt)
       
    };
    
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => {
      if(data.search===''){
        setResults(results2)
      }
      else{
        const dt = results2.filter((x:{SubSkill:string})=> x.SubSkill === data.search)
        setResults(dt)
      }
      
    }

    

    
  return (
    <div className="flex items-center justify-center p-5 w-full">
        <div >
          <div className="py-5 justify-start">
          
              {listtype.map((type,index) =>{
                return(
                  <div key={index} >
                    <div className="flex items-center mb-3">
                      <input id={type.id.toString()} type="radio" value={type.typeeng}
                      name="default-radio"
                      onChange={(e) => handleOptionChange(e.target.value)}
                      checked={selectedOption === type.typeeng}
                      className="w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500
                       dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor={type.id.toString()} className="ms-2 text-lg font-medium text-gray-900 dark:text-gray-900">{type.type}</label>
                    </div>
                    {/* <div >
                    <input type="radio" key={index} value={type.typeeng} 
                      onChange={(e) => handleOptionChange(e.target.value)}
                      checked={selectedOption === type.typeeng}
                    ></input>
                    <label>{type.type}</label>
                    </div> */}
                  </div>
                )
              })}
          </div>
          <label className='py-5'>จำนวน {results.length} รายการ</label>
          <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register("search")}
            className="w-full  px-4 py-2 text-lg rounded-md border-2 border-gray-500 focus:border-gray-700 outline-none transition">
                    <option value=''></option>
                    {subskills.map((_sub : any ,_index : any) => {
                        return (
                            <option key={_index} value={_sub.subskill} >{_sub.subskill}</option>
                        )
                    })}
            </select>
            <div className='py-2'>
              <Button>
                ค้นหา
              </Button>
            </div>
          </form>
          </div>
          <div>
            {results.map((data : any,index : any) => {
                return(
                    <div key={index} className='py-1'>
                        <div className='border-neutral-600 border-2 rounded-md p-2 '>
                            <div className='text-lg font-semibold '>
                              <p>{data.MainSkill}</p>
                              <p>{data.SubSkill}</p>
                            </div>
                            <hr className="h-px my-2 bg-gray-700 border-0 dark:bg-gray-700"></hr>
                            <p>{data.SkillOther}</p>
                            <p>{data.Place}</p>
                            <p>{data.PlaceOther}</p>
                            <p>{data.Ward}</p>
                            <p>{data.WardOther}</p>
                            <p>เตียง : {data.Bed}</p>
                            <p>{data.ApproverName}</p>
                            {data.Status === "WAIT" ? 
                            <div className='justify-center flex p-1 gap-10'> 
                              <Button color='green'>
                                <Link href={`/Home/ViewLog/Approve/${data.Aid}`}>
                                  อนุมัติ
                                </Link>
                              </Button>
                             <Button><Link href={{
                              pathname:`/Home/ViewLog/ModifyLog/${data.id}`
                             }}>แก้ไข</Link></Button>
                            </div>
                            :null}
                            
                            
                        </div>
                    </div>
                )
            })}
          </div>
        </div>
    </div>
  )
}

export default Viewlog