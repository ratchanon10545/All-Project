import App2 from '@/app/components/NewLog/App2'
// import axios from 'axios'
import React from 'react'
// import config from '@/app/config';
interface Props {
  data?: any ;
}

export function Page3 ({
  data
}:Props) {
    // const approver = await axios.get(`${config.apiUrl}/api/approver`)
  return (
    <div>
        <App2
          data={data}
        />
    </div>
  )
}
