"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

//   console.log(pathname, href, isActive);
  return (
    <Link href={href} className={`px-4 py-2 transition ${isActive ? "border-b-2 border-black" : "hover:bg-gray-200"}`}>
      {children}
    </Link>
  );
};

export default function Navbar({encode_id}: {encode_id: string}) {
  return (
    <nav className="flex gap-4 ml-32">
      <NavLink href={`/channel/${encode_id}`}>Video</NavLink>
      <NavLink href={`/channel/${encode_id}/playlist`}>Playlist</NavLink>
      <NavLink href={`/channel/${encode_id}/community`}>Community</NavLink>
    </nav>
  );
}
