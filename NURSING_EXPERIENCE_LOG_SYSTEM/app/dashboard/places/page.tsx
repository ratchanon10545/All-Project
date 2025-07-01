import React from 'react'

import styles from '@/app/components/dashboard/user/user.module.css'
import Search from '@/app/components/dashboard/search/search'
import Link from 'next/link'
import config from '@/app/config'
import axios from 'axios'
import Delete from '@/app/components/dashboard/deletebutton/delete'
import MyNextJsExcelSheet from '@/app/components/ExcelImport'

const Place = async ({searchParams}:any) => {
    const users = await axios.get(`${config.apiUrl}/api/places`)
    const listusers = users.data.place

    const findUser = listusers.filter((user : any) => {
      if(searchParams.search){
        return (
          parseInt(user.id) === parseInt(searchParams.search) ||
          user.Place.toLowerCase().includes(searchParams.search.toLowerCase())

        )}
          else{
            return(listusers)
          }
      });

    return (
      <div className={styles.container}>
        <div className={styles.top}> 
          <Search placeholder='Serach' search={searchParams.search}/>
          <MyNextJsExcelSheet pathApi={'/api/createmanyplace'}/>
          <Link href='/dashboard/places/add'>
            <button className={styles.addButton}>เพิ่ม</button>
          </Link>
        </div>
        <div className="relative overflow-x-auto pt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className='px-6 py-3'>id</th>
                <th scope="col" className='px-6 py-3'>Place</th>
                <th scope="col" className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {findUser.map((user:any,index:any)=>{
                      return(
                      <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                         <td className='px-6 py-4'>{user.id}</td> 
                         <td className='px-6 py-4'>{user.Place}</td>
                         <td>
                          <Link href={`/dashboard/places/modify/${user.id}`}>
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            แก้ไข</button>
                          </Link>
                        
                          <Delete id={user.id} path={'/api/deleteplace'}/>
                       </td>
                      </tr>
                      )
                  })}
          </tbody>
        </table>
        </div>
      </div>
    )
}

export default Place