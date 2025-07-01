import React from 'react'
import Upload from '@/app/components/Studio/Upload'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Pagination from '@/app/components/Studio/Pagination';


export default async function page() {

  const session = await getServerSession(authOptions);

//   const videos  = await fetch(`http://localhost:3000/api/video/${session?.user.user_id}?page=1&limit=10`, {
//     method: 'GET',
//   }).then(res => res.json());

  return (
    <div>
       <Pagination session={session} />
    </div>
  )
}
