import Image from 'next/image';
import YouTube_Logo from '../../public/image/YouTube_Logo_2017.png';
import SearchBar from './SearchBar';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignInButton from './SignInButton';
import Profile from './Profile';

export default async function Header() {
  const session = await getServerSession(authOptions);
  
  return (
    <header className="fixed flex items-center justify-between bg-white p-4 shadow-sm z-10 w-full">
      <a href="/" className='cursor-pointer'>
        <div className="flex items-center space-x-4">
          <Image
            src= {YouTube_Logo}
            alt="YouTube Logo"
            width={130}
            height={130}
          />                                      
        </div>
      </a>
      <div>
        <SearchBar/>
      </div>

      
        {session && (
            <div className="hidden md:flex items-center space-x-4 ">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md">Upload</button>
            <Profile id={session.user.user_id ?? " "} username={session.user.name ?? ''} email={session.user.email ?? ''} profilePicture={session.user.profilePicture ?? '/default-profile-picture.png'}/>
            </div>
        ) }

        {!session && (<SignInButton/>)}
    </header>
  );
}