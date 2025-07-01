'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

interface Video {
  title: string;
  username : string;
  video_url : string;
  views : number;
  user_id : string;
  video_id : string;
}


const fetchMoreData = async (id:string) => {
  const res = await fetch(`http://localhost:3000/api/video?id=${id}&page=1&limit=10`);
  return res.json();
};

const delay = (delayInms : number) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};


export default function ListVideo({videos ,id}:{videos :  Video[] ,id:string}) {
  const [items, setItems] = useState(videos);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  
  const observerRef = useRef<HTMLDivElement | null>(null);
  const rounter = useRouter()

   useEffect(() => {
        const observer = new IntersectionObserver(
          async (entries) => {
            if (entries[0].isIntersecting && !loading) {
              setLoading(true);
              let delayres = await delay(400);
              fetchMoreData(id).then( (newData) => {
                setItems((prev) => [...prev, ...newData]);
                setPage((prev) => prev + 1);
                setLoading(false);
                
              });
            }
          },
          { threshold: 1.0 }
        );
    
        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
      }, [page, loading]);

  return (
    <div className=''>
      <div>
      {items.map((video: Video, index: number) => (
      <div key={index} className='max-w-md  mt-2 ml-5 flex cursor-pointer' onClick={()=>rounter.push(`/watch/${encodeURIComponent(btoa(btoa(video.video_id)))}`)}>
        <div className='w-72'>
          <video
          key={video.video_url}
          className='rounded-md'
          >
            <source src={video.video_url} type="video/mp4" />
            <source src={video.video_url} type="video/webm" />
          </video>
        </div>
        
        <div className='w-full font-bold overflow-hidden ml-2'>
          <div>{video.title}</div>
          <a href={`/channel/${encodeURIComponent(btoa(btoa(video.user_id)))}`}><div className='font-thin text-xs text-gray-500 mt-2 ml-1 hover:underline'>{video.username}</div></a>
          <div className='font-thin text-xs text-gray-500  ml-1'>views {video.views}</div>
        </div>
        
      </div>
      ))}
      <div ref={observerRef} className="h-10 text-center">
          {loading ? 
          <div className="flex mt-2 justify-center min-h-screen">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div> : ""}
        </div>
      </div>
      
    </div>
  )
}
