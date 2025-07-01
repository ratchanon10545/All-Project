'use client'
import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';

const Chart = ({value} : any) => {
  return (
    // <PieChart
    //         series={[
    //             {
    //             data: [
    //                 { id: 1, value: 100-value, label: 'unfinished' , color:'red' },
    //                 { id: 0, value: value, label: 'finished' , color:'green' },
    //             ],
    //             },
    //         ]}
            
    //         width={400}
    //         height={200}
    // />
    <div className="bg-gray-400 w-full h-10">
      <div className={`bg-green-600 h-10 items-center ${value >= 5 ? 'justify-center' :''}
       text-white
      flex p-3`} style={{width : `${value}%`}}>{value.toFixed(4)}%</div>
    </div>
  )
}

export default Chart