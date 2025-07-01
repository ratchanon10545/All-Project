'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation'
type Inputs = {
    id:number,
    Sid:number,
    StudentName: string,
    Date:string,
    Place : string,
    PlaceOther:string,
    Ward : string,
    WardOther:string,
    Bed : string,
    MainSkill : string,
    SubSkill : string,
    ApproverName : string,
    Status : string
  }
const listtype = [
    {id : 1 , type: "ภายใน"},
    {id : 0 , type: "ภายนอก"}
]

const Status = [
    {status:"WAIT"},
    {status:"APPROVED"}
]

const Modifylog = ({practicelog,dataskills,approvers}:any) => {
    const router = useRouter()
    const mainskills = dataskills.main
    const subskills = dataskills.sub
    const oldid = practicelog.id
    
    if (practicelog.ApproverType === "ภายใน"){
        var type1 = 1
    }
    else{
        type1 = 0
    }

    const [results,setResults] = useState(approvers)
    const [type,setType] = useState(practicelog.ApproverType)
    const [Code,setCode] = useState(practicelog.Code)
    const [Aid,setAid] = useState<number>(practicelog.Aid)
    const [selectedOption, setSelectedOption] = useState<number>(type1);
    const handleOptionChange = (type : any) => {
        setSelectedOption(parseInt(type));
        if (parseInt(type) === 1){
            setType('ภายใน')
        }
        else{
            setType('ภายนอก')
        }
        const dt = approvers.filter((x:{type: number}) => x.type === parseInt(type))
          setResults(dt)
      };
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>({defaultValues:practicelog})
      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const listdata = {
            ...data,
            Code,
            Aid,
            type,
            SkillOther : '',
            oldid
        }
        await axios.put('/api/modifypracticelog',listdata)
        router.push('/dashboard/practicelog')
        }
        
    const CodeHandle = (subskill:any) =>{
        if(subskill !== ''){
            const dt = subskills.filter((x:{subskill: string}) => x.subskill === subskill)
            setCode(dt[0].code)
        }
    }
    const AidHandle = (name:any) => {
        if(name !== ''){
            const dt = results.filter((x:{name: string}) => x.name === name)
            setAid(dt[0].id)
        }
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
                    <input  {...register('Sid', { required: true })} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    <label htmlFor="floating_Name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        SID</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input  {...register('StudentName', { required: true })} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    <label htmlFor="floating_Name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        StudentName</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input  {...register('Date', { required: true })} type="date"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    <label htmlFor="floating_Name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Date</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input  {...register('Place', { required: true })} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    <label htmlFor="floating_Name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Place</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input  {...register('PlaceOther')} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    <label htmlFor="floating_Name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        PlaceOther</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input  {...register('Ward', { required: true })} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    <label htmlFor="floating_Name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Ward</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input  {...register('WardOther')} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    <label htmlFor="floating_Name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        WardOther</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input  {...register('Bed', { required: true })} type="text"  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    <label htmlFor="floating_Name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Bed</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="underline_select" className="sr-only">Underline select</label>
                    <select  {...register('MainSkill', { required: true })} id="underline_select" 
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-700 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                        <option value=''>Choose a Mainskills</option>
                        {mainskills.map((mainskill : any,index : any)=>{
                            return(
                                <option key={index} value={mainskill.mainskills}>{mainskill.mainskills}</option>
                            )
                        })}
                        
                    </select>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="underline_select" className="sr-only">Underline select</label>
                    <select  {...register('SubSkill', { required: true })} id="underline_select" onChange={(e) => CodeHandle(e.target.value)}
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-700 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                        <option value=''>Choose a Subskills</option>
                        {subskills.map((subskill : any,index : any)=>{
                            return(
                                <option key={index} value={subskill.subskill}>{subskill.subskill}</option>
                            )
                        })}
                        
                    </select>
                </div>

                <div >
                {listtype.map((type,index) =>{
                  return(
                    <div key={index} className="flex items-center mb-4">
                      <input type="radio" key={index} value={type.id} 
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        onChange={(e) => handleOptionChange(e.target.value)}
                        checked={selectedOption === type.id}
                        
                      ></input>
                      <label className='ms-2 text-sm font-medium text-gray-600 dark:text-gray-600'>{type.type}</label>
                    </div>
                  )
                })}
            </div>

                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="underline_select" className="sr-only">Underline select</label>
                    <select  {...register('ApproverName', { required: true })} id="underline_select"  onChange={(e) => AidHandle(e.target.value)}
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-700 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                        <option value=''>Choose a Approver</option>
                        {results.map((approver : any,index : any)=>{
                            return(
                                <option key={index} value={approver.name}>{approver.name}</option>
                            )
                        })}
                        
                    </select>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="underline_select" className="sr-only">Underline select</label>
                    <select   id="underline_select" {...register('Status', { required: true })}
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-700 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                        <option value=''>Choose a Status</option>
                        {Status.map((status : any,index : any)=>{
                            return(
                                <option key={index} value={status.status}>{status.status}</option>
                            )
                        })}
                        
                    </select>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
      )
}

export default Modifylog