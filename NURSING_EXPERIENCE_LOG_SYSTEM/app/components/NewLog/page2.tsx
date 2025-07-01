// import axios from 'axios'
// import config from '@/app/config';
import React from 'react'
import Search from '@/app/components/NewLog/SearchLive';

interface Props {
  data?: any ;
}

export function Page2({
  data
}:Props) {
    // const place = await axios.get(`${config.apiUrl}/api/place`) 
  return (
    <div>
      <Search
        place={data}
      />
    </div>
  )
}

