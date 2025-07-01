'use client'
import { useRouter } from 'next/navigation';
import { comment } from 'postcss';
import React, { use, useEffect, useRef, useState } from 'react'


export default function DotsMenu({onDelData, user_id ,session , comment_id , onAction ,comment_content} : 
    {user_id : number , session :any , comment_id :number , onAction:(id: number, content:string) => void , comment_content:string
      , onDelData: () => void
    }) {

    const [menu ,setMenu] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    
    const sendMessageToParent = () => {
        onAction(comment_id ,comment_content); // Call the parent's function
      };

    const router = useRouter()
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setMenu(false);
          }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef]);

    const handleDelete = async (comment_id : number) =>{
        const video_id = comment_id 
        const res = await fetch(`/api/comment/${video_id}`,
            {
                method:'DELETE'
            }
        )

        if(res.ok){
            router.refresh()
            setMenu(false);
            onDelData();
        }
    }

    const handleMenu = () =>{
      if(user_id ){
        // setMenu(true)
        console.log('user_id',user_id)
      }
      else{
        return false
      }
    }
  return (
    <div ref={modalRef} className="relative inline-block text-left">
              <div>
                <button onClick={() => setMenu(true)} type="button" className="inline-flex justify-center w-full rounded-full p-2 focus:outline-none focus:bg-slate-200">
                  <svg className="w-6 h-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v.01M12 12v.01M12 18v.01" />
                  </svg>
                </button>
              </div>

              {menu &&
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg group-hover:block z-10">
              <ul className="py-2">
                 
                  { session && user_id == session.user.user_id ?
                  <div>
                     <li>
                         <div  onClick={sendMessageToParent} className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100">Edit</div>
                     </li>
                     <li>
                         <div onClick={() => handleDelete(comment_id)}  className="cursor-pointer block px-4 py-2 text-gray-700 hover:bg-gray-100">Delete</div>
                     </li>
                 </div> :
                 <li>
                   <div className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Report</div>
                 </li>
                 }
             </ul>
           </div>}
              
    </div>
  )
}
