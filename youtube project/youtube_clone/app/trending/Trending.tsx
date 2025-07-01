'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { formatNumber } from '@/lib/formatnumber';
interface Video {
    user_id: string;
    title: string;
    username: string;
    views: number;
    video_url: string;
    description: string;
    profile_picture: string;
    video_id: string;
}
const fetchMoreData = async (page:number) => {
    const res = await fetch(`http://localhost:3000/api/trending?page=${page}&limit=10`);
    return res.json();
  };
  const delay = (delayInms : number) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  };


export default function Trending({video} : {video : Video[]}) {
    const [data, setData] = useState<Video[]>(video);
    const [page, setPage] = useState<number>(2);
    const [loading, setLoading] = useState(false);
    const [counter, setCounter] = useState(0);
    const [moreData, setMoreData] = useState(true);
    const observerRef = useRef<HTMLDivElement | null>(null);
    
    const videoRefs = useRef<HTMLVideoElement[]>([]);
    const [progress, setProgress] = useState<number>(0);
    const [isHovering, setIsHovering] = useState<number | null>(null);

     const router = useRouter();
     
    useEffect(() => {
          setCounter(data.length);
        }, [data]);
    
         useEffect(() => {
              const observer = new IntersectionObserver(
                async (entries) => {
                  if (entries[0].isIntersecting && !loading) {
                    setLoading(true);
                    let delayres = await delay(400);
                    fetchMoreData(page).then( (newData) => {
                        if(newData.length === 0){
                            // console.log(moreData);
                            return setMoreData(false);
                        }
                      else{
                        setData((prev) => [...prev, ...newData]);
                        setPage((prev) => prev + 1);
                        setLoading(false);
                      }
                      
                    });
                  }
                },
                { threshold: 0.5 }
              );
          
              if (observerRef.current) observer.observe(observerRef.current);
              return () => observer.disconnect();
            }, [page, loading]);
        
    
        const handleMouseEnter = (index : number) => {
            setIsHovering(index);
            // console.log(videoRefs.current[index]);
            videoRefs.current.forEach((video, i) => {
                if (video && i === index) {
                    videoRefs.current[index]?.play();
                }
            });
        };
    
        const handleMouseLeave = (index : number) => {
            setIsHovering(null);
            if (videoRefs.current) {
              videoRefs.current[index]?.pause();
              if (videoRefs.current[index]) {
                videoRefs.current[index].currentTime = 0; // Reset video to the start
              }
              setProgress(0); // Reset progress bar
            }
          };
          const handleTimeUpdate = (index : number) => {
            if (videoRefs.current) {
              if (videoRefs.current[index]) {
                const progressValue =
                (videoRefs.current[index].currentTime / videoRefs.current[index].duration) * 100;
              setProgress(progressValue);
              }
              
            }
          };
          
  return (
    <div>
        {data.map((video, index) => (
            <div key={index} className='flex p-3 space-x-4 border cursor-pointer' 
            onClick={() => router.push(`/watch/${btoa(btoa(video.video_id))}`)}>
          
            <div className='max-w-md relative cursor-pointer'
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => router.push(`/watch/${btoa(btoa(video.video_id))}`)}
            >
                <video 
                key={video.video_url}
                
                ref={(el) => {
                    if (el) videoRefs.current[index] = el;
                  }}
                muted
                loop
                onTimeUpdate={() => handleTimeUpdate(index)}
                className='rounded-lg hover:rounded-none'>
                    <source src={video.video_url} type="video/mp4" />
                    <source src={video.video_url} type="video/webm" />
                </video>

                {isHovering === index &&  (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300">
                  <div
                    className="h-full bg-red-500 transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
            </div>
            <div className='cursor-pointer' onClick={() => router.push(`/watch/${btoa(btoa(video.video_id))}`)}>
                <p className="text-lg font-bold text-gray-700">{video.title}</p>
                <p className='text-xs font-mono text-gray-500'>views {formatNumber(video.views)}</p>
                <div className='flex items-center space-x-2'>
                    <div className='overflow-hidden mt-2'>
                        <img className='w-7 h-7 rounded-full' src={video.profile_picture} alt="" />
                    </div>
                    <a href={`/channel/${btoa(btoa(video.user_id))}`}><p className='text-xs mt-2 font-mono text-gray-500 hover:underline hover:cursor-pointer'>{video.username}</p></a>
                </div>
                <p className='text-xs font-mono text-gray-500 mt-5'>{video.description}</p>
            </div>
          
        </div>
        ))}
        <div ref={observerRef} className="h-10 text-center">
        {loading && moreData ? 
          <div className="flex mt-2 justify-center min-h-screen">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div> : ""}
      </div>
    </div>
  )
}
