import React from 'react'
import ProfilePage from './Profile'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function profile() {
  const session = await getServerSession(authOptions);
  // console.log(session);

  const user = await fetch(`http://localhost:3000//api/user/${session?.user.user_id}`);
  const data = await user.json();

  // console.log(data);
  return (
    <div>
      <ProfilePage data={data} session={session} />
    </div>
  )
}
