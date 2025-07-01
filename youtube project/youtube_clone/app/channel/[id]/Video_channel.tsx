'use client';
import React, { useEffect, useRef, useState } from 'react'
import { formatNumber } from '@/lib/formatnumber';
interface Video {
    user_id: string;
    video_url: string;
    title: string;
    profile_picture: string;
    username: string;
    views: string;
    video_id : string;
  }
  const fetchMoreData = async (id:string , limit:number ,page:number) => {
    const res = await fetch(`http://localhost:3000/api/video/${id}?limit=${limit}&page=${page}`, {
      cache: "no-store", // Avoid caching if needed
      // next: { revalidate: 1000 }, // Re-fetch every hour
    });
    // if(res){
    //   console.log(res.json());
    // }
    return res.json();
  };


  const delay = (delayInms : number) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  };  

export default function Video({videos ,id, limit} : {videos : Video[] , id:string , limit: number}) {
  const [items, setItems] = useState(videos);
  const [page, setPage] = useState<number>(limit+1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHaveMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
        const observer = new IntersectionObserver(
          async (entries) => {
            if (entries[0].isIntersecting && !loading) {
              setLoading(true);
              let delayres = await delay(400);
              fetchMoreData(id,limit,page).then( (newData) => {
                // console.log(newData.data);
                if(newData.data.length === 0){
                  return setHaveMore(false);
                }
                setItems((prev) => [...prev, ...newData.data]);
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
  
      
  const handleMouseEnter = (index : number) => {
    
    videoRefs.current.forEach((video, i) => {
      if (video && i === index) {
        // video.pause();
        videoRefs.current[index]?.play();
      }
    });
   
  };

  const handleMouseLeave = (index : number) => {
   
    if (videoRefs.current) {
      videoRefs.current[index]?.pause();
      if (videoRefs.current[index]) {
        videoRefs.current[index].currentTime = 0; // Reset video to the start
      }
      
    }
  };
 

  return (
    <div className='grid grid-cols-4 gap-4'>
        {items.map((video , index) => (
        <div key={index} className='cursor-pointer overflow-hidden' 
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={() => handleMouseLeave(index)}
              >
         
         <a href={`/watch/${encodeURIComponent(btoa(btoa(video.video_id)))}`}>
          <video muted  className='rounded-md'
          ref={(el) => {
            if (el) videoRefs.current[index] = el;
          }}>
            <source src={video.video_url} type="video/mp4" />
          </video>
          <div className='mt-2'>
            <h1>{video.title}</h1>
            <p className='text-xs font-mono text-gray-600'>views: {formatNumber(parseInt(video.views))}</p>
          </div>
          </a>
        </div>
      ))}
      {items.length >= limit && hasMore &&  <div ref={observerRef} className="h-10 text-center">
          {loading ? 
          <div className="flex mt-2 justify-center min-h-screen">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div> : ""}
        </div>}
    </div>
  )
}
