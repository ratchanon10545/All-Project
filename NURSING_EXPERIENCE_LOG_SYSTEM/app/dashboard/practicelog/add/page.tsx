import Addpracticelog from '@/app/components/dashboard/practicelog/addpracticelog'
import config from '@/app/config'
import axios from 'axios'
import React from 'react'

const AddPracticeLog = async () => {
    const dataskills = await axios.get(`${config.apiUrl}/api/dataskills`)
    const approvers = await axios.get(`${config.apiUrl}/api/approver`)
  return (
    <Addpracticelog dataskills={dataskills.data} approvers={approvers.data.approver}/>
  )
}

export default AddPracticeLog