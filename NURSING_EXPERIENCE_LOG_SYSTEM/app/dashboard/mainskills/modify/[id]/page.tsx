import Modifymainskill from '@/app/components/dashboard/mainskill/modifymainskill'

import config from '@/app/config'
import axios from 'axios'
import React from 'react'

const ModifyPlace = async ({params}:any) => {
  const getuser = await axios.get(`${config.apiUrl}/api/getsinglemainskill/${params.id}`)
  return (
    <Modifymainskill mainskill={getuser.data.user}/>
  )
}

export default ModifyPlace