import Modifyplace from '@/app/components/dashboard/place/modifyplace'

import config from '@/app/config'
import axios from 'axios'
import React from 'react'

const ModifyPlace = async ({params}:any) => {
  const getuser = await axios.get(`${config.apiUrl}/api/getsingleplace/${params.id}`)
  return (
    <Modifyplace place={getuser.data.user}/>
  )
}

export default ModifyPlace