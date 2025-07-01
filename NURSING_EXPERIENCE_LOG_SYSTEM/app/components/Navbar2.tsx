'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import NuLogo from "@/public/Nu.png";
import Image from 'next/image'
import admin from "@/public/admin.jpg";
const Navbar = ({user}:any) => {
    const [isOpen,setIsOpen] = useState(false)
    const [isOpen2,setIsOpen2] = useState(false)
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
    function getMenuClasses2() {
        let menuClasses = []

        if(isOpen2){
            menuClasses = [
                'z-50',
                'my-4',
                'text-base',
                'list-none',
                'bg-white',
                'divide-y',
                'divide-gray-100',
                'rounded-lg',
                'shadow ',
                'dark:bg-gray-700',
                'dark:divide-gray-600',
                'absolute',
                'right-8',
                'top-10',
                'md:top-14'
            ]
        }else{
            menuClasses.push('hidden')
        }

        return menuClasses.join(" ");
    }
  return (
    <nav className=' bg-gray-400 text-white p-4 sm:p-6 md:flex md: justify-between md:items-center '>
        <div className="container mx-auto flex justify-between items-center">
                <Image
                    src={NuLogo}
                    width={40}  
                    height={40}
                    alt="Picture"
                />
            <div className={getMenuClasses()}>
                <Link href='/Home' onClick={()=>{setIsOpen(false)}} className='mx-2 hover:text-gray-300'>
                    หน้าหลัก
                </Link>
                <Link href='/Home/NewLog'  onClick={()=>{setIsOpen(false)}} className='mx-2 hover:text-gray-300'>
                    บันทึกประสบการณ์
                </Link>
                <Link href='/Home/ViewLog' onClick={()=>{setIsOpen(false)}} className='mx-2 hover:text-gray-300'>
                    ดูรายการบันทึก
                </Link>
                <Link href='/Home/Progress' onClick={()=>{setIsOpen(false)}} className='mx-2 hover:text-gray-300'>
                    ตรวจสอบความคืบหน้า
                </Link>
            </div>
            <div className='flex items-center gap-2'>
                <button onClick={()=>{setIsOpen2(!isOpen2)}} type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <span className="sr-only">Open user menu</span>
                    <Image
                    src={admin}
                    width={35}  
                    height={35}
                    alt="Picture"
                    className='rounded-full'
                />
                </button>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ">

                    <div className={getMenuClasses2()} id="user-dropdown">
                        <div className="px-4 py-3">
                            <span className="block text-sm text-gray-900 dark:text-white">{user.id}</span>
                            <span className="block text-sm text-gray-900 dark:text-white">{user.name}</span>
                            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                        </div>

                    </div>
            
                </div>
                <button onClick={()=>{setIsOpen(!isOpen) , setIsOpen2(false)}} className='md:hidden'>
                <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
                </button>
            </div>
            
        </div>
    </nav>

  )
}

export default Navbar