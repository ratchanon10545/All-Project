import ProgressButton from '@/app/components/dashboard/progress/button'
import Chart from '@/app/components/dashboard/progress/chart'
import config from '@/app/config'
import axios from 'axios'
import React from 'react'


const page = async () => {
    const data = await axios.get(`${config.apiUrl}/api/adminprogress`)
    const users = data.data.listuser
    const subskills = data.data.subskills
    const value =  data.data.allvalue
    
  return (
    <div>
        <p>ความคืบหน้าทั้งหมด</p>
        <div className='flex justify-center py-5'>
            <Chart value={value}/>
        </div>
        
        {subskills.map((sub : any,index : any)=>{
            return(
                <div key={index}>
                    <ProgressButton subskill={sub.subskill} users={users} reqSub={sub.reqSubject} reqPro={sub.reqProgram} code={sub.code}/>
                </div>
            )
        })}
    </div>
  )
}

export default page