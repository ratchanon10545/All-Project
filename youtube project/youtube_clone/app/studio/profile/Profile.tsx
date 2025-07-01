"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {PencilLine , X} from 'lucide-react';
import Modal from "@/app/components/Modal";
export default function ProfilePage({session , data} : any) {
  const [name, setName] = useState(data.username);
  const [password, setPassword] = useState("");
  const [confrim_password, setConfrim_Password] = useState("");
  const [email, setEmail] = useState(data.email);
  const [image, setImage] = useState<File | null >(null);
  const [preview, setPreview] = useState<string | null >(data.profile_picture);
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [edit , setEdit] = useState(false);
  const [editEmail , setEditEmail] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if(file){
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }
    
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email ) {
      setError("All fields, including a profile picture, are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if(image){
        formData.append("profilePicture", image);
    }

    const res = await fetch(`/api/user/${session.user.user_id}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Edit failed");
      return;
    }

    alert("Profile Updated Successfully");
    location.reload();
  };

  const openModal = () => {
    router.push("?modal=true", { scroll: false }); // Prevents scrolling to top
  };
  return (
    <div className="flex  items-center justify-center bg-gray-100">
    <div className="w-full p-8 space-y-6 bg-white shadow-lg rounded-lg">
  
      {/* Signup Form */}
      <form onSubmit={handleSignup} className="space-y-4">
        {/* Profile Image Upload */}
        <div className="flex items-center justify-center">
          {preview ? (
            <div className="relative">
                <img
              src={preview}
              alt="Profile Preview"
              className="w-64 h-64  rounded-full object-cover border"
            />
            <label 
                  htmlFor="profilePicture" 
                  className="absolute bottom-0 right-0 bg-black rounded-full p-3 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
            </label>
            </div>
          ) : (
            <div className="w-64 h-64 flex items-center justify-center border rounded-full bg-gray-200 relative">
              <span className="text-gray-500 text-sm">No Image</span>
              
            </div>
          )}
          
          
        </div>
        
        <div className="hidden font-[sans-serif] max-w-md mx-auto mt-5">
            <input type="file" id="profilePicture" onChange={handleImageChange} accept="image/*"
              className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded" />
            <p className="text-xs text-gray-400 mt-2">PNG, JPG SVG, WEBP are Allowed.</p>
          </div>
        
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <div className="flex items-center space-x-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled= {edit ? false : true}
            className="w-1/3 px-3 py-2 focus:outline-none border-b-2 border-gray-700 disabled:bg-gray-100"
          />
          <PencilLine onClick={() => setEdit(true)} className={`${edit ? 'hidden': ''} w-6 h-6 text-balck cursor-pointer`} />
          <X onClick={() => {setEdit(false) ; setName(data.username)}} className={`${edit ? '': 'hidden'} w-6 h-6 text-balck cursor-pointer`} />
          </div>

        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="flex items-center space-x-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={editEmail ? false : true}
            className="w-1/3 px-3 py-2 focus:outline-none border-b-2 border-gray-700 disabled:bg-gray-100"
          />
          <PencilLine onClick={() => setEditEmail(true)} className={`${editEmail ? 'hidden': ''} w-6 h-6 text-balck cursor-pointer`} />
          <X onClick={() => {setEditEmail(false) ; setEmail(data.email)}} className={`${editEmail ? '': 'hidden'} w-6 h-6 text-balck cursor-pointer`} />
          </div>
        </div>

        {/* Password */}
        <div className="flex space-x-3">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <p  onClick={openModal} className="block text-sm font-medium text-gray-700 underline hover:text-blue-500 cursor-pointer">Change Password</p>
        </div>
        
        {/* Submit Button */}
        <div className="flex items-center justify-center">
            <button
            type="submit"
            className="w-1/2 px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-600 transition"
            >
            Submit
            </button>
        </div>
      </form>

    
    </div>
    <Modal>
        <div>
        <form  className="space-y-4">
            {/* Password */}
                <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                />
                </div>
                
                {/*Confrime Password */}
                <div>
                <label className="block text-sm font-medium text-gray-700">Confrim Password</label>
                <input
                    type="password"
                    value={confrim_password}
                    onChange={(e) => setConfrim_Password(e.target.value)}
                    
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-black rounded-lg hover:bg-gray-700 transition"
                >
                    Submit
                </button>
                </form>
        </div>
    </Modal>
  </div>
  );
}
