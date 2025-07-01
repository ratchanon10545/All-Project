
import Modifysubskill from '@/app/components/dashboard/subskills/modifysubskill'
import config from '@/app/config'
import axios from 'axios'
import React from 'react'

const ModifySubskill = async ({params}:any) => {
  const getuser = await axios.get(`${config.apiUrl}/api/getsinglesubskill/${params.id}`)
  const mainskills = await axios.get(`${config.apiUrl}/api/mainskills`)
  return (
    <Modifysubskill subskill={getuser.data.user} mainskills={mainskills.data.mainskills}/>
  )
}

export default ModifySubskill