import React from 'react'

const ProgressPage = ({data, count}:any) => {
    const Count = count[0]
  return (
    <div className='flex justify-center w-full'>
        <table >
            <thead className='border-2 '>
                <tr>
                    <th className='border-2 p-2 '>ประสบการณ์</th>
                    <th className='border-2 p-2 '>จำนวน</th>
                    <th className='border-2 p-2 '>วิชา</th>
                    <th className='border-2 p-2 ' >หลักสูตร</th>
                </tr>
            </thead>
            <tbody >
                {data.map((subskill:any,index:any)=>{
                    return(
                    <tr key={index} className='border-2'>
                        <td className='p-2'>{subskill.subskill}</td>
                        <td className='border-2 p-2'>{Count[subskill.code]}</td>
                        <td className={Count[subskill.code] >= subskill.reqSubject ? 'border-2 bg-green-600 p-2':'border-2 bg-red-600 p-2'}>{subskill.reqSubject}</td>
                        <td className={Count[subskill.code] >= subskill.reqProgram ? 'border-2 bg-green-600 p-2':'border-2 bg-red-600 p-2'}>{subskill.reqProgram}</td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default ProgressPage