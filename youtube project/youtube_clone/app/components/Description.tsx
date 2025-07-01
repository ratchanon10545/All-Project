import React from 'react'

export default function Description({views , description} : {views :string ,description : string}) {
  return (
    <div className='bg-gray-100 mt-3 p-3 rounded-md'>
        <div className='text-sm font-bold'>views {views}</div>
        {description}
    </div>
  )
}
