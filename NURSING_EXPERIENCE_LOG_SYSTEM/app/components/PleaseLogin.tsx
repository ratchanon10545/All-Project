import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const PleaseLogin
 = () => {
  return (
    <div className='flex justify-center py-14 '>
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">ไม่พบข้อมูลผู้ใช้งาน</div>
        <p className="text-gray-700 text-base justify-center flex">
          กรุณาเข้าสู่ระบบ
        </p>
      </div>
      <div className='flex justify-center p-2'><Button><Link href="/">เข้าสู่ระบบ</Link></Button></div>
    </div>
    
    </div>
    
  )
}

export default PleaseLogin