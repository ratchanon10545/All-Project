import React from 'react'
import styles from '@/app/components/dashboard/user/user.module.css'
import Search from '@/app/components/dashboard/search/search'
import Link from 'next/link'
import config from '@/app/config'
import axios from 'axios'
import Delete from '@/app/components/dashboard/deletebutton/delete'

const WrongPin = async () => {
  const users = await axios.get(`${config.apiUrl}/api/getwrongpin`)
  const listusers = users.data.users

  return (
    <div className={styles.container}>
      <div className={styles.top}> 
        <Search placeholder='Serach for UserId'/>
      </div>
      <div className="relative overflow-x-auto pt-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              <th scope="col" className='px-6 py-3'>Id</th>
              <th scope="col" className='px-6 py-3'>StudentName</th>
              <th scope="col" className='px-6 py-3'>ApproverName</th>
              <th scope="col" className='px-6 py-3'>Wrong Pin</th>
              <th scope="col" className='px-6 py-3'>CreatedAt</th>
              <th scope="col" className='px-6 py-3' >Action</th>
          </tr>
        </thead>
        <tbody>
          {listusers.map((user:any,index:any)=>{
                    const createdAt  = new Date(user.createdAt)
                    return(
                    <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                       <td className='px-6 py-4'>{user.id}</td> 
                       <td className='px-6 py-4'>{user.StudentName}</td>
                       <td className='px-6 py-4'>{user.ApproverName}</td>
                       <td className='px-6 py-4'>{user.WrongPin}</td>
                       <td className='px-6 py-4'>{createdAt.toLocaleString()}</td>
                       <td>
                        <Delete id={user.id} path={'/api/deletewrongpin'}/>
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



export default WrongPin