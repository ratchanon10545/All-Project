import Modifyuser from '@/app/components/dashboard/user/modify/Modifyuser'
import config from '@/app/config'
import axios from 'axios'
import React from 'react'

const ModifyUser = async ({params}:any) => {
  const getuser = await axios.get(`${config.apiUrl}/api/getsingleuser/${params.id}`)
  return (
    <Modifyuser user={getuser.data.user}/>
  )
}

export default ModifyUser