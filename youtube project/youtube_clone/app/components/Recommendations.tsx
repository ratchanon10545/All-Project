'use client';
import React, { useEffect, useRef , useState } from 'react';
import { formatNumber } from '@/lib/formatnumber';
interface Video {
  user_id: string;
  video_url: string;
  title: string;
  profile_picture: string;
  username: string;
  views: string;
  video_id :string;
}

interface RecommendationsProps {
  video: Video[];
}


const fetchMoreData = async (id:string , fetchMore_url : string , page : number) => {
  const res = await fetch(`${fetchMore_url}${id}&page=${page}&limit=6`);
  return res.json();
};

const delay = (delayInms : number) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};

export default function Recommendations({video ,id , fetchMore_url} : {video : Video[] ,id:string , fetchMore_url:string}) {
    // console.log(video);
    const [items, setItems] = useState(video);
    const [page, setPage] = useState<number>(2);
    const [loading, setLoading] = useState(false);
    const [moreData, setMoreData] = useState(true);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const videoRefs = useRef<HTMLVideoElement[]>([]);
    const [progress, setProgress] = useState<number>(0);
    const [isHovering, setIsHovering] = useState<number | null>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting && !loading) {
            setLoading(true);
            let delayres = await delay(400);
            fetchMoreData(id , fetchMore_url , page).then( (newData) => {
              if(newData.length === 0){
                // console.log(moreData);
                return setMoreData(false);
            }
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


    const handleMouseEnter = (index : number) => {
      setIsHovering(index);
      videoRefs.current.forEach((video, i) => {
        if (video && i === index) {
          // video.pause();
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
      <section className="bg-white ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" 
       >
        {items.map((video , index ) => (
          
          <div className="bg-white p-4 rounded-lg shadow-md relative  " key={index}>
            <a href={`/watch/${encodeURIComponent(btoa(btoa(video.video_id)))}`} >
            <div
              className="relative w-full max-w-2xl mx-auto cursor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <video
                ref={(el) => {
                  if (el) videoRefs.current[index] = el;
                }}
                className="w-full object-cover"
                muted // Mute the video for a better UX on hover
                loop // Loop the video for continuous playback on hover
                onTimeUpdate={() => handleTimeUpdate(index)}
              >
                <source src={video.video_url} type="video/mp4" />
                <source src={video.video_url} type="video/webm" />
                Your browser does not support the video tag.
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
            </a>
            <div className='flex mt-2 overflow-hidden'>
              <img className='w-9 h-9 rounded-full' src={video.profile_picture} alt="" />
              <div className=''>
              <a href={`/watch/${encodeURIComponent(btoa(btoa(video.video_id)))}`} ><p className="text-lg ml-1 font-bold text-gray-700">{video.title}</p></a>
                <a href={`/channel/${encodeURIComponent(btoa(btoa(video.user_id)))}`}><p className='text-xs ml-2 font-mono text-gray-500 hover:underline hover:cursor-pointer'>{video.username}</p></a>
                <p className='text-xs ml-2 font-mono text-gray-500'>views {formatNumber(parseInt(video.views))}</p>
              </div>
            </div>
          </div>
          
        ))}
        
        </div>
        <div ref={observerRef} className="h-10 text-center">
          {loading && moreData ?
          <div className="flex mt-2 justify-center min-h-screen">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div> : ""}
        </div>
          
      </section>
    );
  }
  