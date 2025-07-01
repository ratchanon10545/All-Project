import React from 'react'
import styles from '@/app/components/dashboard/user/user.module.css'
import Search from '@/app/components/dashboard/search/search'
import Link from 'next/link'
import config from '@/app/config'
import axios from 'axios'
import Delete from '@/app/components/dashboard/deletebutton/delete'

const GoogleUsers = async ({searchParams}:any) => {
    const users = await axios.get(`${config.apiUrl}/api/googleusers`)
    const listusers = users.data.users
    const findUser = listusers.filter((user : any) => {
      if(searchParams.search){
        return (
          user.name.toLowerCase().includes(searchParams.search.toLowerCase()) ||

          user.email.toLowerCase().includes(searchParams.search.toLowerCase())

        )}
          else{
            return(listusers)
          }
      });
    return (
      <div className={styles.container}>
        <div className={styles.top}> 
          <Search placeholder='Serach' search={searchParams.search}/>
          
        </div>
        <div className="relative overflow-x-auto pt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className='px-6 py-3'>Id</th>
                <th scope="col" className='px-6 py-3'>Name</th>
                <th scope="col" className='px-6 py-3'>Email</th>
                <th scope="col" className='px-6 py-3' >Action</th>
            </tr>
          </thead>
          <tbody>
            {findUser.map((user:any,index:any)=>{
                      return(
                      <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                         <td className='px-6 py-4'>{user.id}</td> 
                         <td className='px-6 py-4'>{user.name}</td>
                         <td className='px-6 py-4'>{user.email}</td>
                         <td >
                         <Delete id={user.id} path={'/api/deletegoogleuser'}/>
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

export default GoogleUsers