import React from 'react'
import styles from '@/app/components/dashboard/user/user.module.css'
import Search from '@/app/components/dashboard/search/search'
import Link from 'next/link'
import config from '@/app/config'
import axios from 'axios'
import Delete from '@/app/components/dashboard/deletebutton/delete'
import PaginationControls from '@/app/components/dashboard/practicelog/pagination'
import MyNextJsExcelSheet from '@/app/components/ExcelImport'

const Wards = async ({searchParams}: any) => {
  const search = searchParams.search ?? ''
  const page = searchParams['page'] ?? '1'
    const per_page = 10

    const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
    const end = start + Number(per_page)

    const users = await axios.get(`${config.apiUrl}/api/wards`)
    const listusers = users.data.ward
    
    

  const findUser = listusers.filter((user : any) => {
      if(searchParams.search){
        return (
          parseInt(user.id) === parseInt(searchParams.search) ||

          user.ward.toLowerCase().includes(searchParams.search.toLowerCase()) ||

          parseInt(user.placeid) === parseInt(searchParams.search)

        )}
          else{
            return(listusers)
          }
      });

      const entries = findUser.slice(start, end)
    return (
      <div className={styles.container}>
        <div className={styles.top}> 
          <Search placeholder='Serach' search={searchParams.search}/>
          <MyNextJsExcelSheet pathApi={'/api/createmanyward'}/>
          <Link href='/dashboard/wards/add'>
            <button className={styles.addButton}>เพิ่ม</button>
          </Link>
        </div>
        <div className="relative overflow-x-auto pt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className='px-6 py-3'>id</th>
                <th scope="col" className='px-6 py-3'>ward</th>
                <th scope="col" className='px-6 py-3'>placeid</th>
                <th scope="col" className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((user:any,index:any)=>{
                      return(
                      <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                         <td className='px-6 py-4'>{user.id}</td> 
                         <td className='px-6 py-4'>{user.ward}</td>
                         <td className='px-6 py-4'>{user.placeid}</td>
                         <td>
                          <Link href={`/dashboard/wards/modify/${user.id}`}>
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            แก้ไข</button>
                          </Link>
                        
                          <Delete id={user.id} path={'/api/deleteward'}/>
                        </td>
                      </tr>
                      )
                  })}
          </tbody>
        </table>
        <div className='p-5'>
          <PaginationControls
            hasNextPage={end < findUser.length}
            hasPrevPage={start > 0}
            Allpage={findUser.length}
            search={search}
            status=''
          />
        </div>
        </div>
      </div>
    )
}

export default Wards