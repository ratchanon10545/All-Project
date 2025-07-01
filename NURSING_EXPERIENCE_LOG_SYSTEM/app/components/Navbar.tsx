'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import NuLogo from "@/public/Nu.png";
import Image from 'next/image'
const Navbar = () => {
    const [isOpen,setIsOpen] = useState(false)

    function getMenuClasses() {
        let menuClasses = []

        if(isOpen){
            menuClasses = [
                'flex',
                'absolute',
                'top-[60px]',
                'bg-gray-400',
                'w-full',
                'p-4',
                'left-0',
                'gap-10',
                'flex-col',
            ]
        }else{
            menuClasses.push('hidden md:flex')
        }

        return menuClasses.join(" ");
    }
  return (
    <nav className='bg-gray-400 text-white p-4 sm:p-6 md:flex md: justify-between md:items-center'>
        <div className="container mx-auto flex justify-between items-center">
                <Image
                    src={NuLogo}
                    width={40}  
                    height={40}
                    alt="Picture"
                />
            <div className={getMenuClasses()}>
                <Link href='/Home' className='mx-2 hover:text-gray-300'>
                    หน้าหลัก
                </Link>
                <Link href='/Home/NewLog' className='mx-2 hover:text-gray-300'>
                    บันทึกประสบการณ์
                </Link>
                <Link href='/Home/ViewLog' className='mx-2 hover:text-gray-300'>
                    ดูรายการบันทึก
                </Link>
                <Link href='/Home/Progress' className='mx-2 hover:text-gray-300'>
                    ตรวจสอบความคืบหน้า
                </Link>
            </div>
            <div className='md:hidden flex items-center'>
                <button onClick={()=>{setIsOpen(!isOpen)}}>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
                </button>

            </div>
        </div>
    </nav>

  )
}

export default Navbar