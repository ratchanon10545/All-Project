import React from 'react'

import styles from '@/app/components/dashboard/user/user.module.css'
import Search from '@/app/components/dashboard/search/search'
import Link from 'next/link'
import config from '@/app/config'
import axios from 'axios'
import Delete from '@/app/components/dashboard/deletebutton/delete'
import PaginationControls from '@/app/components/dashboard/practicelog/pagination'
import Status2 from '@/app/components/dashboard/search/status'
import MyNextJsExcelSheet from '@/app/components/ExcelImport'


const PracticeLog = async ({searchParams}: any ) => {
    const search = searchParams.search ?? ''
    const status = searchParams.status ?? ''
    const page = searchParams['page'] ?? '1'
    const per_page = 7

    const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
    const end = start + Number(per_page)

    const users = await axios.get(`${config.apiUrl}/api/praticelog`)
    const listusers = users.data.practiceLog
    
    const findUser = listusers.filter((user : any) => {
      if(searchParams.search){
        return (
          parseInt(user.Sid) === parseInt(searchParams.search) ||

          user.StudentName.toLowerCase().includes(searchParams.search.toLowerCase()) ||

          user.Date.toLowerCase().includes(searchParams.search.toLowerCase()) ||

          user.Place.toLowerCase().includes(searchParams.search.toLowerCase()) ||

          user.Ward.toLowerCase().includes(searchParams.search.toLowerCase()) || 

          user.Code.toLowerCase().includes(searchParams.search.toLowerCase()) ||

          user.ApproverType.toLowerCase().includes(searchParams.search.toLowerCase()) ||

          user.ApproverName.toLowerCase().includes(searchParams.search.toLowerCase())

        )}
          else{
            return(listusers)
          }
      });
  const findUser2 = findUser.filter((user : any) => {
        if(searchParams.status){
          return (
            user.Status.toLowerCase().includes(searchParams.status.toLowerCase())
          )}
            else{
              return(findUser)
            }
        });
    const entries = findUser2.slice(start, end)
    return (
      <div className={styles.container}>
        <div className={styles.top}> 
          <div className='flex gap-8'>
            <Search placeholder='Serach' search={searchParams.search}/>
            <Status2 search={searchParams.search} status = {searchParams.status}/>
          </div>
          <MyNextJsExcelSheet pathApi={'/api/createmanylog'}/>
          <Link href='/dashboard/practicelog/add'>
            <button className={styles.addButton}>เพิ่ม</button>
          </Link>
        </div>
        <div className="relative overflow-x-auto pt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className='px-6 py-3'>id</th>
                <th scope="col" className='px-6 py-3'>Sid</th>
                <th scope="col" className='px-6 py-3'>StudentName</th>
                <th scope="col" className='px-6 py-3'>Date</th>
                <th scope="col" className='px-6 py-3'>Place</th>
                <th scope="col" className='px-6 py-3'>PlaceOther</th>
                <th scope="col" className='px-6 py-3'>Ward</th>
                <th scope="col" className='px-6 py-3'>WardOther</th>
                <th scope="col" className='px-6 py-3'>Bed</th>
                <th scope="col" className='px-6 py-3'>Code</th>
                <th scope="col" className='px-6 py-3'>MainSkill</th>
                <th scope="col" className='px-6 py-3'>SubSkill</th>
                <th scope="col" className='px-6 py-3'>SkillOther</th>
                <th scope="col" className='px-6 py-3'>ApproverType</th>
                <th scope="col" className='px-6 py-3'>Aid</th>
                <th scope="col" className='px-6 py-3'>ApproverName</th>
                <th scope="col" className='px-6 py-3'>createdAt</th>
                <th scope="col" className='px-6 py-3'>modifyAt</th>
                <th scope="col" className='px-6 py-3'>approvedAt</th>
                <th scope="col" className='px-6 py-3'>Status</th>
                <th scope="col" className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((user:any,index:any)=>{
                      const createdAt  = new Date(user.createdAt)
                      const modifyAt  = new Date(user.modifyAt)
                      if(user.approvedAt === null){
                        var appAt = ''
                      }
                      else{
                        const approvedAt  = new Date(user.approvedAt)
                        appAt = approvedAt.toLocaleString()
                      }
                      
                      return(
                      <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                         <td className='px-6 py-4'>{user.id}</td> 
                         <td className='px-6 py-4'>{user.Sid}</td>
                         <td className='px-6 py-4'>{user.StudentName}</td>
                         <td className='px-6 py-4'>{user.Date}</td>
                         <td className='px-6 py-4'>{user.Place}</td>
                         <td className='px-6 py-4'>{user.PlaceOther}</td>
                         <td className='px-6 py-4'>{user.Ward}</td>
                         <td className='px-6 py-4'>{user.WardOther}</td>
                         <td className='px-6 py-4'>{user.Bed}</td>
                         <td className='px-6 py-4'>{user.Code}</td>
                         <td className='px-6 py-4'>{user.MainSkill}</td>
                         <td className='px-6 py-4'>{user.SubSkill}</td>
                         <td className='px-6 py-4'>{user.SkillOther}</td>
                         <td className='px-6 py-4'>{user.ApproverType}</td>
                         <td className='px-6 py-4'>{user.Aid}</td>
                         <td className='px-6 py-4'>{user.ApproverName}</td>
                         <td className='px-6 py-4'>{createdAt.toLocaleString('th-TH')}</td>
                         <td className='px-6 py-4'>{modifyAt.toLocaleString('th-TH')}</td>
                         <td className='px-6 py-4'>{appAt}</td>
                         <td className='px-6 py-4'>{user.Status}</td>
                         <td>
                          <Link href={`/dashboard/practicelog/modify/${user.id}`}>
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                            แก้ไข</button>
                          </Link>
                        
                          <Delete id={user.id} path={'/api/deletelog'}/>
                        </td>
                      </tr>
                      )
                  })}
          </tbody>
        </table>
        <div className='p-5'>
          <PaginationControls
            hasNextPage={end < findUser2.length}
            hasPrevPage={start > 0}
            Allpage={findUser2.length}
            search={search}
            status = {status}
          />
        </div>
        </div>
      </div>
    )
}

export default PracticeLog
