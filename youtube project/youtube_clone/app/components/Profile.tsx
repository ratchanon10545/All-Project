'use client';
import { useState , useRef, useEffect} from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface ProfileProps {
    id : string;
    profilePicture: string;
    username : string;
    email : string;
}

const Profile: React.FC<ProfileProps> = ({id, profilePicture , username ,email }) => {
    const [isProfileVisible, setIsProfileVisible] = useState<boolean>(false);
    const pathname = usePathname();
    const rounter = useRouter();
    const ProfileRef = useRef<HTMLDivElement>(null);

    const base_64_id = btoa(btoa(id)); // Encode @
    const encode_id = encodeURIComponent(base_64_id); // Encode @

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (ProfileRef.current && !ProfileRef.current.contains(event.target as Node)) {
            setIsProfileVisible(false); // Hide the profile
          }
        };
    
         document.addEventListener("click", handleClickOutside);
            
        return () => {
          document.removeEventListener("click", handleClickOutside);
          };
        },[]);
    return (
        <div className="relative">
            <div ref={ProfileRef} onClick={() => setIsProfileVisible(!isProfileVisible)}>
                <img
                src={profilePicture}
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer"
                
                />    
            </div>
            
            {isProfileVisible && (
                <div className="absolute top-10 right-0 bg-white p-4 shadow-md rounded-lg w-48 space-y-2">
                    <div className="flex items-center space-x-4">
                        <img
                        src={profilePicture}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full cursor-pointer"/>
                        <div>
                            <div className="font-bold text-xl">{username}</div>
                            <div className="text-gray-600 text-sm">{email}</div>
                        </div>
                    </div>
                    <hr/>
                    <button onClick={() => rounter.push(`/studio/profile`)} className="block w-full text-left hover:bg-gray-200 p-2 rounded-md">Profile</button>
                    <button onClick={() => rounter.push(`/channel/${encode_id}`)} className="block w-full text-left hover:bg-gray-200 p-2 rounded-md">Channel</button>
                    <button onClick={() => signOut({ callbackUrl: pathname })} className="block w-full text-left hover:bg-red-800 p-2 rounded-md bg-red-600 text-white">Sign Out</button>
                </div>
            )}
            
           
        </div>
    );
};

export default Profile;