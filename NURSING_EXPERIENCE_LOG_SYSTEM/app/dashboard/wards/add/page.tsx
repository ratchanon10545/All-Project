import Addward from '@/app/components/dashboard/wards/addward'
import config from '@/app/config'
import axios from 'axios'
import React from 'react'

const AddWard = async () => {
  const place = await axios.get(`${config.apiUrl}/api/places`)
  return (
    <Addward places={place.data.place}/>
  )
}

export default AddWard