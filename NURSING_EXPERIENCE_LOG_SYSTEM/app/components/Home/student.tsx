import LogOut from '@/app/components/LogOut'
import { authOptions } from '@/lib/auth'
import { Button } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { PiNotePencilLight } from "react-icons/pi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { GiProgression } from "react-icons/gi";
const StudentPage = async () => {
  const session = await getServerSession(authOptions)
    return (
      <main className="flex  flex-col items-center justify-between w-full">
      <div className='items-center p-5'>
        <div className='grid grid-rows-3 grid-flow-col gap-4 p-5 '>
            <div className=''>
              <Link href={'/Home/NewLog'}>
                <PiNotePencilLight size={150}/>
                <p className='justify-center flex'>บันทึกประสบการณ์</p>
              </Link>
            </div>
            <div className=''>
              <Link href={'/Home/ViewLog'}>
                <IoIosCheckmarkCircleOutline size={150}/>
                <p className='justify-center flex'>ดูรายการบันทึก</p>
              </Link>
            </div>
            <div className=''>
              <Link href={'/Home/Progress'}>
                <GiProgression size={150}/>
                <p className='justify-center flex'>ตรวจสอบความคืบหน้า</p>
              </Link>
            </div>
            
        </div>
        <div className='justify-center flex'>
          <LogOut></LogOut>
        </div>
        
      </div>
      
      </main>
    )
  }

export default StudentPage 