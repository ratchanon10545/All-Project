import React, { ReactNode } from 'react'
import Navbar from '../../components/ChannelNavigation';
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import Subscriber_Button from '@/app/components/Subscriber_Button';
import { formatNumber } from '@/lib/formatnumber';
interface User {
  id: number;
  username: string;
  email: string;
  profile_picture: string;
  follower: number;
}

async function getUser(id: string) {
    const res = await fetch(`http://localhost:3000/api/user/${id}`, {
      // cache: "no-store", // Avoid caching if needed
      next: { revalidate: 300 }, 
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }
  
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

export default async function layout({children , params}: {children: ReactNode , params: Promise<{ id: string }>} ) {
    const decodedUsername = decodeURIComponent((await params).id); // Decode @
    const id = atob(atob(decodedUsername)); // Decode @
    const session = await getServerSession(authOptions);

    const subscribers = await getSubscribers(id , session?.user.user_id);
    const user : User = await getUser(id);

    

  return (
    <div>
        <div className='ml-28 flex mb-7'> 
                    <img className='w-40 h-40 border rounded-full' src={user.profile_picture} alt="porfile_user" />
                    <div className='ml-4'>
                        <h1 className='text-5xl font-semibold mb-2 mt-2'>{user.username}</h1>
                        <div className='flex'>
                          <p className='text-md font-thin'>{user.email} </p>
                          <p className='ml-2 text-gray-400 text-sm items-center flex'>{'● '+formatNumber(user.follower)+' subscribers'}</p>
                        </div>
                        
                        { id === session?.user.user_id ? 
                        <div className='flex mt-4'>
                            <button className='bg-gray-100 border border-gray-600 text-black rounded-xl mr-2 p-2'>Edit Profile</button>
                            <button className='bg-gray-100 border border-gray-600 text-black rounded-xl p-2'>Edit Video</button>
                        </div>
                        :<Subscriber_Button  channel_id = {id} session = {session} subscribers = {subscribers}/>
                        }

                        

                      
                    </div>
        </div>
        <Navbar encode_id={(await params).id}/>
        <hr />
        <div className='ml-32'>
            {children}
        </div>
        
    </div>
  )
}
