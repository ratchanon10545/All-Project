import CheckLogin from '@/app/components/CheckLogin'
import PleaseLogin from '@/app/components/PleaseLogin'
import Viewlog from '@/app/components/ViewLog/viewlog'
import config from '@/app/config'
import { authOptions } from '@/lib/auth'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import React from 'react'


const viewlog = async () => {
    
    const check = await CheckLogin()
    if (check){
        const session = await getServerSession(authOptions)
        const log = await axios.get(`${config.apiUrl}/api/logview`,{
            params:{
                id : session?.user.id
            }
        })
        const subskills = await axios.get(`${config.apiUrl}/api/subskills`)
        
        return(
            <div>
                <Viewlog
                    data = {log.data}
                    subskills = {subskills.data.subskills}
                />
            </div>
        )
    }
    else{
        return <PleaseLogin></PleaseLogin>
    }
}

export default viewlog