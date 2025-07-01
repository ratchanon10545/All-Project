'use client';
import React, { useEffect, useState } from 'react'
import Upload from './Upload';
import Manage from './Manage';



export default function Pagination({session} : {session : any}) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [page , setPage] = useState(1);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(`http://localhost:3000/api/video/${session?.user.user_id}?page=${currentPage}&limit=${limit}`, {
        method: 'GET',
      });
      const data = await response.json();
      setData(data.data);
      setTotalPages(data.totalPages);
    }
    fetchVideos();
  }, [currentPage, limit]);
  
  return (
    <div>
        <div className='flex justify-end p-4'>
           <Upload session={session}/>
           </div>
            
    
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg z-0">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Video
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Views
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            Likes
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Manage
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((video: any, index: any) => (
                        <tr className="border-b border-gray-200 dark:border-gray-700" key={index}>
                        <th scope="row" className="px-5 py-2 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                            <div className='flex items-center space-x-2'>
                                <video className='w-20 h-20' src={video.video_url}></video>
                                <p>{video.title}</p>
                            </div>
                        </th>
                        <td className="px-6 py-4">
                            {video.views}
                        </td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                            {video.likes}
                        </td>
                        <td className="px-6 py-4">
                            <Manage video_data={video} session={session} />
                        </td>
                    </tr>    
                    
                    ))}
                    
                </tbody>
            </table>
    
        </div>
        
            <div className='flex justify-center p-4'>
            <button className='px-3 mx-2 bg-gray-700 text-white rounded-md cursor-pointer' disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            <span> Page {currentPage} of {totalPages} </span>
            <button className='px-3 mx-2 bg-gray-700 text-white rounded-md cursor-pointer' disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>
         <div>
        
      </div>
    </div>
  )
}
