"use client";

import Image from "next/image";
import googleLogo from "@/public/google.png";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export function GoogleSignInButton() {
    const router = useRouter()
    const handleClick = async () => {
      const test = await signIn('google',{
        callbackUrl:"/Home"
      })
      
    };
  
    return (
      <button
        onClick={handleClick}
        className=" flex items-center font-semibold justify-center h-14 px-3 mt-3 text-xl  transition-colors duration-300 bg-white border-2 border-gray-200 text-gray-700 rounded-lg focus:shadow-outline hover:bg-slate-300"
      >
        <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
        <span className="ml-4">Continue with Google</span>
      </button>
    );
  }