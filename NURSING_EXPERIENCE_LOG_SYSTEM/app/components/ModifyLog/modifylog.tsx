'use client'
import React, { useState } from 'react'
import LiveSearch from '../LiveSearch'
import { Elsie_Swash_Caps } from 'next/font/google'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import Modal from '@mui/material/Modal'
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box'
import { FcApproval } from "react-icons/fc";
import config from '@/app/config'

import { MdDeleteForever } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'white',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};



const listtype = [
  {id : 1 , type: "ภายใน"},
  {id : 0 , type: "ภายนอก"}
]

interface Inputs{
  Date : string,
  mainskill : string,
  subskill : string,
  place : string,
  ward : string,
  Bed : string,
  approverType : string,
}
const ModifyLogPage = ({data,title,approver,user} : any) => {
  const [approverType2, setApproverType2] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const log = data[0]
  const [code , setCode] = useState(log.Code)
  const [selectedOption, setSelectedOption] = useState(log.ApproverType);
  const handleOptionChange = (type : any) => {
    setSelectedOption(type);
    setApproverType2(type)
  };
  const mainskills = title?.main
  const subskills = title?.sub

  const [results, setResults] = useState<{ id: string; name: string }[]>();
  const [results2, setResults2] = useState<{ id: string; name: string }[]>();
  const [selectedProfile, setSelectedProfile] = useState<{
    id?: string | null;
    name?: string | null;
  }>({id:log.Aid,name:log.ApproverName});
  
  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
    const handleChange: changeHandler = (e) => {
      const { target } = e;
      const filteredValue = results2?.filter((data: { name: string; }) =>
        data.name.toLowerCase().startsWith(target.value)
      );
      setResults(filteredValue);
    };

  type clickHandler = React.MouseEventHandler<HTMLInputElement>;
  const handleClick:clickHandler = (e) => {
        if (selectedOption !== null){
          var typeid : number = 0
          if(selectedOption === "ภายใน"){
            typeid = 1
          }
          else{
            typeid = 0
          }
          const dt = approver.filter((x:{type: number}) => x.type === typeid)
          setResults(dt)
          setResults2(dt)
        }
        else{
          setResults(approver)
          setResults2(approver)
        }
    };
    const {
      register,
      handleSubmit
    } = useForm<Inputs>()

    const onSubmit : SubmitHandler<Inputs> = async (data) =>{
      const approverName = selectedProfile.name
      const Aid = selectedProfile.id
      const listdata = {
        ...data,
        approverName,
        id : log.id,
        code,
        Aid,
        approverType2
      }
    
      await axios.put('/api/updatelog',listdata)
      setOpen(true)
      
    }
    const router = useRouter()

    const handleClose = () => setOpen(false);

    const handleCom = () =>{
      router.push("/Home/ViewLog")
  }

  const onClickDelete = async () =>{
    await axios.delete(`/api/deletelog/${log.id}`)
    setOpen2(true)
  }

  const onClickCopy = async () =>{
    const Sid = user.id
    const Sname = user.name
    const listdata = {
      ...log,
      Sid,
      Sname
    }
    await axios.post('/api/copylog',listdata)
    setOpen3(true)
  }

  const onChange = (subskill : string) => {
    const dt = subskills.filter((x:{subskill : string}) => x.subskill === subskill)
    setCode(dt[0].code)
  }
  
  const Back = ()=>{router.push('/Home/ViewLog')}
  return (
    <div className='flex justify-items-center justify-center p-5'>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          <label>วันที่ : </label>
          <input type="Date" defaultValue={log.Date}  className='rounded-md border-2 border-gray-500' {...register('Date')}/>
        </div>
        <label>บันทึกประสบการณ์</label>
        <div>
          <select defaultValue={log.MainSkill} {...register('mainskill')}
                          className="w-full px-2 py-2 text-lg rounded-md border-2 border-gray-500 focus:border-gray-700 outline-none transition"
                          >
                          <option value='' ></option>
                          {mainskills.map((_main:any,_index:any) =>{
                              return(
                                  <option key={_index} value={_main.mainskills}>{_main.mainskills}</option>
                              )
                          })}
          </select>
        </div>
        <div>
          <select defaultValue={log.SubSkill}  {...register('subskill') } onChange={(e) => onChange(e.target.value)}
          className="w-full  px-4 py-2 text-lg rounded-md border-2 border-gray-500 focus:border-gray-700 outline-none transition">
                    <option value=''></option>
                    {subskills.map((_sub : any ,_index : any) => {
                        return (
                            <option key={_index} value={_sub.subskill} >{_sub.subskill}</option>
                        )
                    })}
                </select>
          </div>
          <div>
            <label>สถานที่ : </label>
            <input type="text"  defaultValue={log.Place} {...register('place')} className='rounded-md border-2 border-gray-500 px-4 py-2 w-full'/>
          </div>
          <div>
            <label>หอผู้ป่วย : </label>
            <input type="text"  defaultValue={log.Ward} {...register('ward')} className='rounded-md border-2 border-gray-500 px-4 py-2 w-full'/>
          </div>
          <div>
            <label>เตียง : </label>
            <input type="text"  defaultValue={log.Bed} {...register('Bed')} className='rounded-md border-2 border-gray-500 px-4 py-2 w-full'/>
          </div>
          <div>
            <label >ผู้นิเทศ</label>
            <div className="">
                {listtype.map((type,index) =>{
                  return(
                    <div key={index} className=" flex items-center">
                      <input id={type.id.toString()} type="radio" key={index} value={type.type} {...register('approverType')}
                        onChange={(e) => handleOptionChange(e.target.value)}
                        checked={selectedOption === type.type}
                        className="w-7 h-7 "
                      ></input>
                      <label htmlFor={type.id.toString()} className="p-2">{type.type}</label>
                    </div>
                  )
                })}
            </div>
              <div>
                <LiveSearch
                results={results}
                value={selectedProfile?.name}
                renderItem={(item) => <p>{item.name}</p>}
                onChange={handleChange}
                onSelect={(item) => setSelectedProfile(item)}
                onClick={handleClick} 
                />
              </div>
          </div>
          <div className="flex justify-center py-5 gap-5">
                 <button type="button" onClick={onClickCopy} className="h-11 px-6 inline-block bg-blue-600 font-semibold text-white rounded-md">
                        คัดลอก
                    </button>
                  <button type="button" onClick={onClickDelete} className="h-11 px-6 inline-block bg-red-500 font-semibold text-white rounded-md">
                        ลบ
                    </button>
                    <button className="h-11 px-6 inline-block bg-green-500 font-semibold text-white rounded-md">
                        บันทึก
                    </button>
          </div>
          <div className="flex justify-center py-5">
            <button type='button' onClick={Back} className="h-11 px-6 inline-block bg-red-500 font-semibold text-white rounded-md">
                  ยกเลิก
            </button>
      </div>
      </div>
      </form>
      
      <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <div className='justify-center flex'>
                    <FcApproval size={150} />
                </div>
                <div className='justify-center flex p-5 text-2xl text-black'>
                    <h1>บันทึกเสร็จสิ้น</h1>
                </div>
                <div className='justify-center flex p-5'>
                    <button
                    onClick={handleCom}
                    className="h-11 px-6 inline-block bg-green-500 font-semibold text-white rounded-md">
                        ตกลง
                    </button>
                </div>
            </Box>
      </Modal>
      <Modal
            open={open2}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <div className='justify-center flex'>
                    <MdDeleteForever color={'red'} size={150} />
                </div>
                <div className='justify-center flex p-5 text-2xl text-black'>
                    <h1>ลบเสร็จสิ้น</h1>
                </div>
                <div className='justify-center flex p-5'>
                    <button
                    onClick={handleCom}
                    className="h-11 px-6 inline-block bg-red-500 font-semibold text-white rounded-md">
                        ตกลง
                    </button>
                </div>
            </Box>
      </Modal>
      <Modal
            open={open3}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <div className='justify-center flex'>
                    <FaRegCopy color={'blue'} size={150} />
                </div>
                <div className='justify-center flex p-5 text-2xl text-black'>
                    <h1>คัดลอกเสร็จสิ้น</h1>
                </div>
                <div className='justify-center flex p-5'>
                    <button
                    onClick={handleCom}
                    className="h-11 px-6 inline-block bg-blue-500 font-semibold text-white rounded-md">
                        ตกลง
                    </button>
                </div>
            </Box>
      </Modal>
    </div>
  )
}

export default ModifyLogPage