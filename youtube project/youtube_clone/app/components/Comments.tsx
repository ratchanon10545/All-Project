'use client'
import SubmitComment from './SubmitComment';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import DotsMenu from './DotsMenu';
import { Divide } from 'lucide-react';

interface Comments {
  content : string;
  username : string;
  profile_picture : string;
  video_id : number;
  user_id : number;
  comment_id : number;
  // num_comments : number;
}

export default function Comments({comments ,session , video_id} : {comments : Comments[] ,session: any , video_id : string}) {
  const [data, setData] = useState<Comments[]>(comments);
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleEdit = (id: number, name: string) => {
    setEditId(id);
    setEditValue(name);
  };

  const handleCancel = () => {
    setEditId(null); // Exit edit mode
    setEditValue("");
  };

  // Parent function to handle child action
  const handleChildAction = (id: number,content: string) => {
    setEditId(id);
    setEditValue(content);
  };

  const handleSave = async (comment_id : number) => {
    const res = await fetch(`/api/comment/${comment_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content : editValue}),
    });
  
    const data = await res.json();
    if (res.ok) {
      setEditId(null);
      fetchData()
    } else {
      console.error("Error:", data.error);
    }

  }

  const fetchData = async () => {
    const res = await fetch(`http://localhost:3000/api/comment/${video_id}`, {
      cache: "no-store",
    });
    const result = await res.json();
    setData(result);
  };


  return (
    <div>
      <div className='font-bold text-xl'>
        Comments {comments.length}
      </div>
      <div className='mt-3 mb-8'>
        <SubmitComment onAddData={fetchData} session={session} video_id={video_id}/>
      </div>
      {data.map((comment , index) => (
        <div key={index} className='mt-5'>
          <div className={` ${editId === comment.comment_id ? '': 'flex justify-between'}`}>
              
             <div>
             {editId === comment.comment_id ? (
                <div className='flex w-full '>
                  <img src={session.user.profilePicture} className='h-9 w-9 rounded-full' alt="" />
                  <div className='ml-4 w-full'>
                    <input type="text" 
                    className=' w-full border-b focus:border-b-2 focus:border-black focus:outline-none text-sm' 
                    placeholder='Add Comment'
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}/>
                  </div>
                </div>
              
              ) : (
                <div className='flex'>
                <img src={comment.profile_picture} className='h-9 w-9 rounded-full' alt="" />
                <div>
                   <div className='text-xs font-semibold ml-3'>@{comment.username}</div>
                   <div className='ml-4'>{comment.content}</div>
                </div>
                </div>
              )}
             </div>
            
            <div>
            {editId === comment.comment_id ? (
                <div className='flex justify-end space-x-4'>
                  <button
                    onClick={handleCancel}
                    className='rounded-xl cursor-pointer py-1 px-5 hover:bg-gray-100'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave(comment.comment_id)}
                    className='rounded-xl cursor-pointer bg-black text-white py-1 px-5'
                  >
                    Save
                  </button>
                  
                </div> ): (
                    <DotsMenu  onDelData={fetchData}  onAction={handleChildAction} user_id = {comment.user_id} session={session} comment_id = {comment.comment_id} comment_content = {comment.content} />
                )}
                
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
