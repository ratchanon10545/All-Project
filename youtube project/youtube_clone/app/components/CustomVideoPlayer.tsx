'use client';
import { useRef, useState  ,MouseEvent, useEffect} from "react";
import { Play, Pause, Volume2, VolumeX ,Maximize, Minimize} from "lucide-react";
import Subscriber_Button from "./Subscriber_Button";
import LikeDislikeButtons from "./LikeDislikeButtons";
import Description from "./Description";
import { formatNumber } from "@/lib/formatnumber";

interface Video {
  user_id: string;
  video_url: string;
  title: string;
  profile_picture: string;
  username: string;
  views: number;
  video_id :string;
  follower : string;
  likes : number;
  dislikes : number;
  description : string;
}

const posts = [
  { id: 1, title: "First Post", likes: 10, dislikes: 2 },
];


const CustomVideoPlayer = ({video , session , subscribers} : {video : Video  , session : any , subscribers :any} ) => {
  // console.log(video.user_id , session.user.user_id)
  const video_id = video.video_id
  const views = video.views
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume_hover, setVolume_hover] = useState(false);

  const [hoverTime, setHoverTime] = useState<string | null>(null);
  const [hoverX, setHoverX] = useState(0);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const hasCounted = useRef(false);
  let watchTime = 0;
  let interval: NodeJS.Timeout;

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = false;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = 1;
      setIsMuted(!isMuted);
      setVolume(isMuted ? 1: 0);
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  
  const handleProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // Get click position relative to the progress bar
    const newTime = (clickX / rect.width) * videoRef.current.duration; // Convert to video time

    videoRef.current.currentTime = newTime;
    setProgress((newTime / videoRef.current.duration) * 100);
  };

  const handleProgressHover = (e: MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    const hoverTimeInSeconds = (hoverX / rect.width) * videoRef.current.duration;

    setHoverX(hoverX);
    setHoverTime(formatTime(hoverTimeInSeconds));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleProgressLeave = () => {
    setHoverTime(null);
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault(); // Prevent the page from scrolling when pressing spacebar
      togglePlayPause();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener("keydown", handleKeyDown);

    return () => {
      container?.removeEventListener("keydown", handleKeyDown);
    };  
  }, [isPlaying]);
  

  useEffect(() => { 
    const videoR = videoRef.current;
    if (!videoR) return;

    // Start tracking watch time when video plays
    const handlePlay = () => {
      
      interval = setInterval(() => {
        watchTime += 1;
        if (watchTime >= 5 && !hasCounted.current) {
          if(!session){
            return false;
          }
          if(parseInt(session.user.user_id )=== parseInt(video.user_id)){
            // console.log(session.user.user_id , video.user_id)
            return false;
          }

          hasCounted.current = true;
          // console.log('test2')
          // console.log(session.user.user_id , video.user_id)
          fetch(`/api/views/${video_id}`, { method: "POST"
            ,
            body :JSON.stringify({views})
           });
        }
      }, 1000); 
    };

    // Stop tracking when paused or ended
    const handlePauseOrEnd = () => clearInterval(interval);

    videoR.addEventListener("play", handlePlay);
    videoR.addEventListener("pause", handlePauseOrEnd);
    videoR.addEventListener("ended", handlePauseOrEnd);

    return () => {
      videoR.removeEventListener("play", handlePlay);
      videoR.removeEventListener("pause", handlePauseOrEnd);
      videoR.removeEventListener("ended", handlePauseOrEnd);
      clearInterval(interval);
    };
  }, [video]);

  return (
    <div>
    <div  ref={containerRef} className=" max-w-7xl rounded-lg  relative">
      {/* Video Element */}
      <video
      key={video.video_url}
       onClick={togglePlayPause} 
        ref={videoRef}
        className="w-full rounded-lg"
        onTimeUpdate={handleProgress}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={video.video_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Controls */}
      <div className="flex items-center w-full mt-3 px-3 absolute mb-2 bottom-1 left-0">
        
 
        <div
        className="absolute bottom-8 left-0 w-full h-1 bg-gray-200 cursor-pointer"
        onClick={handleProgressClick}
        onMouseMove={handleProgressHover}
        onMouseLeave={handleProgressLeave}
        >
            {/* Filled Progress */}
            <div className="h-1 bg-red-500 transition-all duration-100" style={{ width: `${progress}%` }} />

            {/* Hover Time Tooltip */}
            {hoverTime && (
            <div
                className="absolute -top-8 text-xs bg-black text-white px-2 py-1 rounded-md"
                style={{ left: `${hoverX}px`, transform: "translateX(-50%)" }}
            >
                {hoverTime}
            </div>
            )}
        </div>
        
        <div className="flex items-center w-full justify-between">
            <div className="flex">
                {/* Play/Pause Button */}
            <button onClick={togglePlayPause} className="text-gray-100 mr-3">
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            {/* Mute/Unmute Button */}
            <div className="flex items-center" onMouseLeave={() => setVolume_hover(false)} onMouseEnter={() => setVolume_hover(true)}>
                <button onClick={toggleMute}  className="text-gray-100 mr-2">
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>

                {/* Volume Slider */}
                {
                    volume_hover && (
                        <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-1 accent-gray-300 bg-white"
                        />
                    )
                }
            </div>
            </div>
            
            {/* Fullscreen Button */}
            <button onClick={toggleFullscreen} className="text-white">
            {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
            </button>
        </div>
      </div>
        
    </div>

    <div className="">
        <div className="mt-2 font-bold text-xl tracking-wide">
                {video.title}
        </div>
        <div className="flex justify-between items-center">
        <div className=" flex items-center mt-2"> 
          <a href={`/channel/${encodeURIComponent(btoa(btoa(video.user_id)))}`}><img className="h-9 w-9 rounded-full cursor-pointer" src={video.profile_picture} alt="" /></a>
          <div className="font-bold text-sm ml-3">
          <a href={`/channel/${encodeURIComponent(btoa(btoa(video.user_id)))}`}>
              <div>
              {video.username}
              </div>
            </a>
            <div className="font-thin text-gray-500 ml-1">
              follower {formatNumber(parseInt(video.follower))}
            </div>
          </div>

          <div className="items-center -mt-4 ml-2">
            { String(video.user_id) === session?.user.user_id ?
              <div className='flex mt-4'>
                  <button className='bg-gray-100 border border-gray-600 text-black rounded-xl mr-2 p-2'>Edit Profile</button>
                  <button className='bg-gray-100 border border-gray-600 text-black rounded-xl p-2'>Edit Video</button>
              </div>
              :
              <Subscriber_Button session={session} channel_id={video.user_id} subscribers={subscribers}/>
            }
          </div>
          
        </div>

        <div>
          <LikeDislikeButtons
              postId={video.video_id}
              initialLikes={video.likes}
              initialDislikes={video.dislikes}
              user_id={session?.user.user_id}
            />
        </div>
        </div>
      </div>
      
      <div>
        <Description views={video.views.toLocaleString()} description={video.description} />
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
