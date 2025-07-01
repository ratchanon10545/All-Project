'use client'
import React, { useEffect, useState } from 'react'
import { Checkbox } from './CheckBox'
import { Button, Callout } from '@radix-ui/themes'
import { Box, Modal } from '@mui/material'
import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { FcApproval } from 'react-icons/fc'
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

  type Inputs = {
    Pin : string
  }

const ApprovePage = ({data,user}:any) => {
    const [count,setCount] = useState(0)
    const [error, setError] = useState('')
    const [toppings, setToppings] = useState(data)
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const Aid : any = data[0].Aid
    const ApproverName = data[0].ApproverName
    const router = useRouter()
    const updateCheckStatus = (index : any) => {
        
        setToppings(
            toppings.map((topping : any, currentIndex : any) =>
            currentIndex === index
            ? { ...topping, checked: !topping.checked }
            : topping
            )
        )
    }

    const handleQRcode =() =>{
        setOpen(true)
    }
    
    const handleClose = () => {
        setOpen(false)
        
    };

    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { isSubmitSuccessful },
      } = useForm<Inputs>()

      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const listId: any[] = []
        const dt = toppings.filter((x:{checked : boolean} ) => x.checked === true)
        dt.forEach((element: { id: any }) => {
            listId.push(element.id)
        });
        const listdata = {
            ...data,
            Aid,
            listId,
            count
        }
        const listdata2 = {
            ApproverName,
            StudentName : user.name,
            ...data
        }
        try{
            await axios.put('/api/approved',listdata)
            setOpen3(true)
        }
        catch(error : any){
            if(count >= 2){
                setOpen2(true)
            }
            if (error.response) {
                await axios.post('/api/wrongpin',listdata2)
                setCount(error.response.data.count)
                setError(error.response.data.message)
                reset({ Pin:"" })
            }
        }
        }
    const backtoViewlog = () =>{
        router.push('/Home/ViewLog')
    }
  return (
    <div className='flex justify-center p-3'>
        <div>
            <label htmlFor="approver">
                ผู้นิเทศ : {data[0].ApproverName}
            </label>
            
            <div>
                {toppings.map((element:any,index:any)=>{
                    return(
                        <div key={index} className='py-2'>
                            <Checkbox
                            key = {index}
                            isChecked={element.checked}
                            checkHandler={()=> updateCheckStatus(index)}
                            Subskill={element.SubSkill}
                            index = {index}
                            Place={element.Place}
                            Ward={element.Ward}
                            Date={element.Date}
                            />
                        </div>
                        
                    )
                })}
                
            </div>
            <div className='flex justify-center gap-10'>
                <Button onClick={handleQRcode} color='green'>
                    อนุมัติ
                </Button>
                <Button onClick={backtoViewlog} color='red'>
                    ยกเลิก
                </Button>
            </div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <label htmlFor="approver" className='text-gray-800'>
                    ผู้นิเทศ : {data[0].ApproverName}
                </label>
                <div className="py-2">
                {error && <Callout.Root color="red" >
                    <Callout.Text>
                    {error}
                    </Callout.Text>
                </Callout.Root>}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('Pin')} type='password' className='border-2 rounded-md text-black h-10' >
                </input>
                <div className='justify-center flex p-5'>
                    <button
                    className="h-8  inline-block bg-green-600 font-semibold text-white rounded-md">
                        ยืนยัน
                    </button>
                </div>
                </form>
            </Box>
          </Modal>
          <Modal
            open={open2}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <div className='text-black'>
                    <p>คุณใส่รหัสผิดครบ 3 ครั้ง ทำการยกเลิกการขออนุมัติ</p>
                </div>
            <div className='justify-center flex p-5'>
                    <button
                    onClick={backtoViewlog}
                    className="h-8 p-1  inline-block bg-red-500 font-semibold text-white rounded-md">
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
                    <FcApproval size={150} />
                </div>
                <div className='justify-center flex p-5 text-2xl text-black'>
                    <h1>อนุมัติเสร็จสิ้น</h1>
                </div>
                <div className='justify-center flex p-5'>
                    <button
                    onClick={backtoViewlog}
                    className="h-11 px-6 inline-block bg-green-500 font-semibold text-white rounded-md">
                        ตกลง
                    </button>
                </div>
            </Box>
      </Modal>
        </div>

    </div>
  )
}

export default ApprovePage