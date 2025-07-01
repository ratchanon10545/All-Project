import React from 'react'
import Sidebar from '../components/dashboard/sidebar/sidebar'
import Navbar from '../components/dashboard/navbar/navbar'
import styles from '../components/dashboard/dashboard.module.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import PleaseLogin from '../components/PleaseLogin'
import { redirect } from 'next/navigation'
import { Button } from '@mui/material'
import Link from 'next/link'

const Layout = async ({children}: {children : React.ReactNode}) => {
  const session = await getServerSession(authOptions)
  if(session?.user){
    if(session?.user.role === "ADMIN"){
      return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Sidebar/>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
      )
    }
    else{
      return(
        <div className='flex justify-center py-14 '>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">คุณไม่มีสิทธิในการเข้าถึง</div>
        <p className="text-gray-700 text-base justify-center flex">
          โปรดกดกลับเพื่อกลับไปหน้าเข้าสู่ระบบ
        </p>
      </div>
      <div className='flex justify-center p-2'><Button><Link href="/">กลับ</Link></Button></div>
      </div>
    </div>
      )
    }
  }
  else{
    redirect('/pleaselogin')
  }
}

export default Layout