// 'use client';
import React from 'react'
import Video from './Video_channel';

interface Video {
  user_id: string;
  video_url: string;
  title: string;
  profile_picture: string;
  username: string;
  views: string;
  video_id: string;
}


async function getVideo(id: string , limit: number) {
  const res = await fetch(`http://localhost:3000/api/video/${id}?limit=${limit}`, {
    cache: "no-store", // Avoid caching if needed
    // next: { revalidate: 1000 }, // Re-fetch every hour
  });

  if (!res.ok) {
    throw new Error("Failed to fetch video");
  }

  return res.json();
}


export default async function page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const decodedUsername = decodeURIComponent((await params).id); // Decode @
    const id = atob(atob(decodedUsername)); // Decode @
    const limit = 20;
    const videos  = await getVideo(id , limit);

  return (
    <div className='mt-5'>
        <Video videos={videos.data} id={id} limit={limit}/>
    </div>
  )
}
