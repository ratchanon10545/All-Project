import CheckLogin from '@/app/components/CheckLogin'
import PleaseLogin from '@/app/components/PleaseLogin'
import ProgressPage from '@/app/components/Progress/Progress'
import config from '@/app/config'
import { authOptions } from '@/lib/auth'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import React from 'react'

const Progress = async () => {
    const check = await CheckLogin()
    if(check){
        const session = await getServerSession(authOptions)
        const subskills = await axios.get(`${config.apiUrl}/api/subskills/${session?.user.id}`)
        return (
            <div className='p-3'>
                <ProgressPage
                    data = {subskills.data.subskills}
                    count = {subskills.data.count}
                />
            </div>
          ) 
    }
    else{
        return <PleaseLogin/>
    }
}

export default Progress