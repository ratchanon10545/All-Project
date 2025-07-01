import Modifylog from '@/app/components/dashboard/practicelog/modifylog'
import config from '@/app/config'
import axios from 'axios'
import React from 'react'

const ModifyPracticelog = async ({params}:any) => {
    const getuser = await axios.get(`${config.apiUrl}/api/getsinglepracticelog/${params.id}`)
    const dataskills = await axios.get(`${config.apiUrl}/api/dataskills`)
    const approvers = await axios.get(`${config.apiUrl}/api/approver`)
  return (
    <Modifylog practicelog={getuser.data.user} dataskills={dataskills.data} approvers={approvers.data.approver}/>
  )
}

export default ModifyPracticelog