import CheckLogin from '@/app/components/CheckLogin'
import ModifyLogPage from '@/app/components/ModifyLog/modifylog'
import PleaseLogin from '@/app/components/PleaseLogin'
import config from '@/app/config'
import { authOptions } from '@/lib/auth'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import { title } from 'process'
import React from 'react'

const ModifyPageId = async ({params} : any) => {
    const check = await CheckLogin()
    if(check){
        const session = await getServerSession(authOptions)
        const log = await axios.get(`${config.apiUrl}/api/modifylog`,{
            params:{
                Sid : session?.user.id,
                id : parseInt(params.id)
            }
        })
        
        if(log.data.log === undefined || log.data.log.length === 0){
            return (
                <div>
                    Not Found Data in DataBase
                </div>
            )
        }
        else{
            const titles = await axios.get(`${config.apiUrl}/api/dataskills`)
            const approver = await axios.get(`${config.apiUrl}/api/approver`)
            return (
                <div>
                    <ModifyLogPage
                        data = {log.data.log}
                        title = {titles.data}
                        approver = {approver.data.approver}
                        user = {session?.user}
                    />
                </div>
              )
        }
        
    }
    else{
        return(
            <PleaseLogin/>
        )
    }

  
}

export default ModifyPageId