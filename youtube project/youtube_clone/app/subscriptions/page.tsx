import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';
import Recommendations from '../components/Recommendations';

export default async function page() {
  const session = await getServerSession(authOptions);
    
    let id;
    if(!session) {
      id = '0';
      return null;
    }
    else{
      id = session.user.user_id;
    }
    const video = await fetch(`http://localhost:3000/api/subscriber/subscrivideo?user_id=${id}&page=1&limit=9`);
  
    const data = await video.json();
  return (
    <div>
      <div className='text-2xl font-semibold mb-4'>Newest</div>
      <Recommendations  video={data} id={id} fetchMore_url={'http://localhost:3000/api/subscriber/subscrivideo?user_id='} />
    </div>
  )
}
