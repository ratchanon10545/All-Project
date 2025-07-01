'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

//   console.log(pathname, href, isActive);
  return (
    <Link href={href} className={`flex items-center p-3 ${isActive ? " bg-gray-100" : "hover:bg-gray-100"}`}>
      {children}
    </Link>
  );
};

export const Sidebar = ({sessions ,data} : {sessions : any , data : any}) => {
  const menuItems = [
    { name: "Dashboard", icon: '', path: "/studio" },
    { name: "Profile", icon: '', path: "/studio/profile" },
    { name: "Uploads", icon: '', path: "/studio/uploads" },
  ];
  
  return (
    <div className="w-64 shadow-lg fixed h-full bg-white text-black flex flex-col">
      <div className="">
        <div className="p-4 flex justify-center items-center">
          <div>
            <div className="flex items-center justify-center">
            <img
                src={data.profile_picture}
                alt="user"
                className="w-32 h-32 rounded-full"
            />
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold">{data.username}</h2>
                
            </div>
          </div>
        </div>
      </div>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            href={item.path}
          
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};