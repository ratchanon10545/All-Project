import React from 'react'
import CustomVideoPlayer from '@/app/components/CustomVideoPlayer';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ListVideo from '@/app/components/ListVideo';
import Comments from '@/app/components/Comments';


const GetVideo = async (video_id: string) => {
  const res = await fetch(`http://localhost:3000/api/watch/${video_id}`);
  
  return res.json();
}

async function getSubscribers(channel_id: string , user_id: string | undefined) {
  const res = await fetch(`http://localhost:3000/api/subscriber/${channel_id}/${user_id}`, {
    cache: "no-store", // Avoid caching if needed
    
  });

  if (!res.ok) {
    throw new Error("Failed to fetch subscribers");
  }

  return res.json();
}

const GetVideos = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/video?id=${id}&page=1&limit=10`);
  
  return res.json();
}
const GetComments = async (video_id: string) => {
  const res = await fetch(`http://localhost:3000/api/comment/${video_id}`, {
    // cache: "no-store",
  });
  
  return res.json();
}

export default async function page(
  {
    params,
  }: {
    params: Promise<{ video_id: string }>
  }
) {
  const session = await getServerSession(authOptions);
  const decodedUsername = decodeURIComponent((await params).video_id); // Decode @
  const video_id = atob(atob(decodedUsername)); // Decode @
  let id;
  if(!session) {
    id = '0';
  }
  else{
    id = session.user.user_id;
  }

  const video = await GetVideo(video_id);
  const subscribers = await getSubscribers(video.user_id , session?.user.user_id);
  const videos = await GetVideos(id)
  const comments = await GetComments(video_id);

  return (
    <div className='flex gap-4 '>
      <div className=''>
        <CustomVideoPlayer  video={video} session={session}  subscribers={ subscribers}/>
        <div className='mt-5'>
          <Comments comments={comments} session={session}  video_id={video_id} />
        </div>
      </div>
      
      <div className='mr-32 '>
        <ListVideo videos={videos} id={id}/>
      </div>
    </div>
  )
}

