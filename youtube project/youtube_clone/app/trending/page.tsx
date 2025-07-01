import React from 'react'
import Trending from './Trending';

export default async function page() {

  const res = await fetch(`http://localhost:3000/api/trending?page=1&limit=10`, {
    method: "GET",
    next: { revalidate: 3600 },
  });

  const data = await res.json();

  // console.log(data);
  return (
    <div>
      <div className='flex items-center '>
      <div className="relative w-20 h-14 m-5 flex justify-center items-end">
        
        <div className="fire text-5xl ">🔥</div>
        <div className='fire w-10 h-10 shadow-orange-400 shadow-xl blur-sm' style={{ animationDelay: "0.1s" }}></div>
        <div className="fire text-5xl" style={{ animationDelay: "0.2s" }}>🔥</div>
        <div className='fire w-10 h-10 shadow-orange-400 shadow-xl blur-sm' style={{ animationDelay: "0.3s" }}></div>
        <div className="fire text-5xl" style={{ animationDelay: "0.4s" }}>🔥</div>
        <div className='fire w-10 h-10 shadow-orange-400 shadow-xl blur-sm' style={{ animationDelay: "0.5s" }}></div>
      </div>

      <div className='text-3xl font-bold'>Trending</div>
      </div>
      <hr />
      <Trending video={data} />
    </div>
  )
}
