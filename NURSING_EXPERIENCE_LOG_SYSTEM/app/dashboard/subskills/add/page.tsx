import React from 'react'
import config from '@/app/config'
import axios from 'axios'
import Addsubskills from '@/app/components/dashboard/subskills/addsubskills'


const AddSubskill = async () => {
    const mainskills = await axios.get(`${config.apiUrl}/api/mainskills`)
    
  return (
    <Addsubskills mainskills={mainskills.data.mainskills} />
  )
}

export default AddSubskill