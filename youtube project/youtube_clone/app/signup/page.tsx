"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrim_password, setConfrim_Password] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password || !image) {
      setError("All fields, including a profile picture, are required.");
      return;
    }

    if(password !== confrim_password){
      setError("Password and Confrime Password must be same");
      return;
    }

    const base64_password = btoa(btoa(password));
    const base64_confrim_password = btoa(btoa(confrim_password));
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", base64_password);
    formData.append("confrime_password", base64_confrim_password);
    formData.append("profilePicture", image);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Signup failed");
      return;
    }

    setSuccess("Signup successful!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
      

      {/* Signup Form */}
      <form onSubmit={handleSignup} className="space-y-4">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center">
          {preview ? (
            <img
              src={preview}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover border"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center border rounded-full bg-gray-200">
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          )}
          
        </div>
        
        <div className="font-[sans-serif] max-w-md mx-auto mt-5">
            <input type="file" onChange={handleImageChange} accept="image/*"
              className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded" />
            <p className="text-xs text-gray-400 mt-2">PNG, JPG SVG, WEBP are Allowed.</p>
          </div>
        
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-center text-gray-600">
        Already have an account? <a href="/?modal=true" className="text-blue-500 hover:underline">Sign in</a>
      </p>
    </div>
  </div>
  );
}
