
import Modifyward from '@/app/components/dashboard/wards/modifyward'
import config from '@/app/config'
import axios from 'axios'
import React from 'react'

const ModifyPlace = async ({params}:any) => {
  const getuser = await axios.get(`${config.apiUrl}/api/getsingleward/${params.id}`)
  const place = await axios.get(`${config.apiUrl}/api/places`)
  return (
    <Modifyward ward={getuser.data.user} places={place.data.place}/>
  )
}

export default ModifyPlace