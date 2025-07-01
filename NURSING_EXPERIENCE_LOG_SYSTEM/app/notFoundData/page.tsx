'use client'
import React from 'react'
import { Button } from '@radix-ui/themes'
import { signOut } from 'next-auth/react'

const NotFound = () => {
  return (
    <div className='flex justify-center py-14 '>
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">ไม่พบข้อมูลผู้ใช้ในฐานระบบ</div>
        <p className="text-gray-700 text-base justify-center flex">
          กรุณาติดต่อเจ้าหน้าที่ดูแลระบบ
        </p>
      </div>
      <div className='flex justify-center p-2'><Button onClick={()=> signOut({
          redirect: true,
          callbackUrl: '/'})}>Back</Button></div>
    </div>
    </div>

    
  )
} 

export default NotFound