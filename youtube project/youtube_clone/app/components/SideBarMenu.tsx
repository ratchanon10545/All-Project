'use client';
import React from 'react'
import { usePathname } from "next/navigation";
import Link from 'next/link';
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
  
  //   console.log(pathname, href, isActive);
    return (
      <Link href={href} className={`flex justify-center rounded-md  px-4 w-full py-3 transition ${isActive ? " bg-gray-200" : "hover:bg-gray-200"}`}>
        {children}
      </Link>
    );
  };
  
export default function SideBarMenu({session} : {session: any}) {
  return (
    <ul className="space-y-2">
          <li ><NavLink  href="/" >Home</NavLink ></li>
          <li><NavLink href="/trending" >Trending</NavLink></li>
          {session &&
          <li><NavLink href="/subscriptions" >Subscriptions</NavLink></li>}
          {/* <li><a href="#" >Library</a></li> */}
        </ul>
  )
}
