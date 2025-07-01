'use client'

import { Button , Text } from "@radix-ui/themes";
import {  useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useFormState } from "./FormContext"
import { useRouter } from "next/navigation";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";


const schema = z.object({
    title: z.string().min(1,'กรุณากรอกหัวข้อบันทึกประสบการณ์'),
    subtitle: z.string().min(1,'กรุณากรอกหัวข้อบันทึกประสบการณ์'),
    otherskill : z.string(),
    date : z.string().min(1,"Date is required"),
    
  })



interface mainSkills {
    id : number
    mainskills : string
  }

  interface subSkills {
    id : number
    subskill : string
    skillid : number
  }

interface Props {
    data?: any ;
  }


type Inputs = {
    title: string
    subtitle: string
    otherskill : string
    date : Date
 }


const Dropdown = ({
    data
    }: Props) => {
        const {onHandleNext , setFormData , formData } = useFormState()
        var dataCode = ""
        if(formData === undefined){
            dataCode = ""
        }
        else{
            dataCode = formData.code
        }
        const mainskills = data?.main
        const subskills = data?.sub
        // console.log(subskills.filter((x: { skillsid: number; }) => x.skillsid === 1 ))
        const [subskill,setSubskill] = useState(subskills)
        const [selectedIndex, setSelectedIndex] = useState("");
        const [code , setCode] = useState(dataCode)
        const [other,setOther] = useState("")

        
        const handleMainskills = (_id : string) =>{
            const id = parseInt(_id)
            const dt = subskills.filter((x: { skillsid: number; }) => x.skillsid === id)
            setSubskill(dt)
            setSelectedIndex("0")

            if(id === 16){
                setOther("อื่นๆ")
            }
            else{
                setOther("");
                (document.getElementById("othervalue") as HTMLInputElement).value = ' '
            }
            
        }
        
        const onChange = (_id : string) => {
            if( _id === '0'){
               return setSelectedIndex("0")
            }
            setSelectedIndex(_id)
            const dt = subskill.filter((x:{id : number}) => x.id === parseInt(_id))
            setCode(dt[0].code)
          }
        

        const {register,handleSubmit,formState: { errors }} = useForm<z.infer<typeof schema>>({
            defaultValues:formData,
            resolver:zodResolver(schema)
        })
        

        const onSubmit: SubmitHandler<z.infer<typeof schema>>  = (data) =>{
            setFormData((prev: any) => ({ ...prev, ...data, code}));
            onHandleNext()
            
        }
        const rounter = useRouter()

        const onCancel =() => {
            rounter.push("/Home")
        }
        
        return (
            <div className="flex items-center justify-center p-5 ">
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className="py-5 ">
                    <div><label>เลือกบันทึกประสบการณ์</label></div>
                    <select {...register("title", {required : true})} onChange={(e) => handleMainskills(e.target.value) } 
                        className="w-full px-4 py-2 text-lg rounded-md border-2 border-gray-500 focus:border-gray-700 outline-none transition "
                        >
                        <option value='' ></option>
                        {mainskills.map((_main:mainSkills,_index:any) =>{
                            return(
                                <option key={_index} value={_main.id}>{_main.mainskills}</option>
                            )
                        })}
                    </select>
                    <div className=" py-2">{errors.title && <Text color="red">{errors.title.message}</Text>}</div>
                </div>
                <div >
                <select {...register("subtitle" , {required : true})}  value={selectedIndex} onChange={(e) => onChange(e.target.value)} className="w-full  px-4 py-2 text-lg rounded-md border-2 border-gray-500 focus:border-gray-700 outline-none transition">
                    <option value=''></option>
                    {subskill.map((_sub : subSkills ,_index : any) => {
                        return (
                            <option key={_index} value={_sub.id} >{_sub.subskill}</option>
                        )
                    })}
                </select>
                    <div className=" py-2">{errors.subtitle && <Text color="red">{errors.subtitle.message}</Text>}</div>
                </div>
                <div className="py-5">
                    <div><label>กรณีเลือกอื่นๆโปรดระบุ</label></div>
                    <input type={'text'}
                    className={other === 'อื่นๆ' ? 
                    "w-full  px-4 py-2 text-lg rounded-md border-2 border-gray-500 focus:border-gray-700 outline-none transition" : 
                    "w-full  px-4 py-2 text-lg rounded-md border-2 border-gray-500 focus:border-gray-700 outline-none transition bg-gray-300"}
                    {...register("otherskill")}
                    id="othervalue"
                    readOnly={other === 'อื่นๆ' ? false:true}
                    />
                </div>

                <div className="py-5">
                    <div><label>ระบุวันที่</label></div>
                    <input type="date" 
                    className="w-full  px-4 py-2 text-lg rounded-md border-2 border-gray-500 focus:border-gray-700 outline-none transition"
                    {...register("date", {required : true})} required/>
                </div>
                <div className="flex justify-end py-5">
                    <button className="h-11 px-6 inline-block bg-green-500 font-semibold text-white rounded-md">
                        ถัดไป
                    </button>
                    
                </div>
                <div className="flex justify-center p-5">
                    <button className="h-11 px-6 inline-block bg-red-600 font-semibold text-white rounded-md"
                    type="button"
                    onClick={onCancel}
                    >
                        ยกเลิก
                    </button>
                </div>
            </form>
            </div>
        )
}

export default Dropdown