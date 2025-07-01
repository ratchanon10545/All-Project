import React from 'react'
import { Sidebar } from '../components/Studio/Sidebar'
import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';


async function layout({ children }: {children: ReactNode}) {    
    const session = await getServerSession(authOptions);

    const user = await fetch(`http://localhost:3000//api/user/${session?.user.user_id}`);
    const data = await user.json();

    // console.log(data);

  return (
    <div className="bg-white">
          <div className="">
                <Sidebar sessions={session} data={data} />
                <main className='ml-64'>
                  {children}
                </main>
            
          </div>
        </div>
  )
}

export default layout