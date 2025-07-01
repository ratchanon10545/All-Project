import ApprovePage from '@/app/components/Approve/ApprovePage'
import CheckLogin from '@/app/components/CheckLogin'
import PleaseLogin from '@/app/components/PleaseLogin'
import config from '@/app/config'
import { authOptions } from '@/lib/auth'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import React from 'react'

const Approve = async ({params} : any) => {
  const check = await CheckLogin()
  if(check){
    const session = await getServerSession(authOptions)
    const logAllAid = await axios.get(`${config.apiUrl}/api/approvelog/${session?.user.id}`,{
      params:{
        Aid : params.Aid
      }
    })
    return (
      <div><ApprovePage data ={logAllAid.data.datalist} user={session?.user}/></div>
    )
  }
  else{
    return(
      <PleaseLogin/>
  )
  }
}

export default Approve