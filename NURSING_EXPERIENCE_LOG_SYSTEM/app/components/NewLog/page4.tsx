import React, { useState } from 'react'
import { useFormState } from './FormContext'

import { useRouter } from 'next/navigation'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { FcApproval } from "react-icons/fc";
import axios from 'axios'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

interface Props2{
    data : any
    session : any
}
interface Index{
    length: any
    [key : number] : any
}
const Page4 = ({data , session}:Props2) => {
    const [open, setOpen] = useState(false);
    const {formData , onHandleBack} = useFormState()
    const mainskillName = Skills(formData.title,data.main)
    const subskillName = SubSkills(formData.subtitle,data.sub)
    const type = Type(formData.type2)
    const Sid = session.user.id
    const SName = session.user.name
    const router = useRouter()
    const onHandleClick = async () => {
        const Code : string = formData.code
        const Date : string = formData.date
        const Place : string = formData.Place
        const PlaceOther : string = formData.placeother
        const Ward : string = formData.Ward
        const WardOther : string = formData.wardother
        const Bed :string = formData.bed
        const Aid : number = formData.Aid
        const ApproverName : string = formData.ApproverName
        const SkillOther : string = formData.otherskill
        const data = {
            Sid,
            SName,
            Date,
            Place,
            PlaceOther,
            Ward,
            WardOther,
            Bed,
            Aid,
            ApproverName,
            SkillOther,
            mainskillName,
            subskillName,
            type,
            Code
        }
        
        await axios.post('/api/log', data)
        
        setOpen(true)
    }

    const handleClose = () => setOpen(false);
    const handleCom = () =>{
        router.push("/Home")
    }
  return (
    <div className='className="flex items-center justify-center p-5'>
        <div className='py-2'>
            <label>วันที่ :</label>
            <label>{formData.date}</label>
        </div>
        <div className='py-2'>
            <label>ทักษะ :</label>
            <div><label>{mainskillName}</label></div>
            <div><label>{subskillName}</label></div>
        </div>
        <div className='py-2'>
            <label>ทักษะอื่นๆ :</label>
            <label>{formData.otherskill}</label>
        </div>
        <div className='py-2'>
            <label>สถานที่ :</label>
            <label>{formData.Place}</label>
        </div>
        <div className='py-2'>
            <label>สถานที่อื่นๆ :</label>
            <label>{formData.placeother}</label>
        </div>
        <div className='py-2'>
            <label>หอผู้ป่วย :</label>
            <label>{formData.Ward}</label>
        </div>
        <div className='py-2'>
            <label>หอผู้ป่วยอื่นๆ :</label>
            <label>{formData.wardother}</label>
        </div>
        <div className='py-2'>
            <label>เตียง :</label>
            <label>{formData.bed}</label>
        </div>
        <div className='py-2'>
            <label>ผู้ประเมินประเภท :</label>
            <label>{type}</label>
        </div>
        <div className='py-2'>
            <label>ผู้ประเมิน :</label>
            <label>{formData.ApproverName}</label>
        </div>
        <div className="flex gap-32 justify-end py-5">
                <button
                type="button"
                onClick={onHandleBack}
                className="h-11 px-6 inline-block bg-blue-600 font-semibold text-white rounded-md"
              >
                กลับ
              </button>
              <button
              onClick={onHandleClick} 
              className="h-11 px-6 inline-block bg-green-500 font-semibold text-white rounded-md">
                บันทึก
              </button>
          </div>
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
    </div>
  )
}

function Skills(mainskillID : string,data: Index){
    const len = data.length
    const ID = parseInt(mainskillID)
    for(let i = 0;i < len; i++){
        if( ID === data[i].id){
            return data[i].mainskills
        }
        
    }
    
}
function SubSkills(subskillID : string,data: Index){
    const len = data.length
    const ID = parseInt(subskillID)
    for(let i = 0;i < len; i++){
        if( ID === data[i].id){
            return data[i].subskill
        }
        
    }
    
}
function Type(type : string){
    if(parseInt(type) === 1){
        return "ภายใน"
    }
    else{
        return "ภายนอก"
    }
    
}


export default Page4