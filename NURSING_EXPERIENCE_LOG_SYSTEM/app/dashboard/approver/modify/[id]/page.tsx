import Modifyapprver from '@/app/components/dashboard/approver/modifyapprover'
import config from '@/app/config'
import axios from 'axios'
import React from 'react'

const ModifyApprover = async ({params}:any) => {
  const getuser = await axios.get(`${config.apiUrl}/api/getsingleapprover/${params.id}`)
  return (
    <Modifyapprver user={getuser.data.user}/>
  )
}

export default ModifyApprover