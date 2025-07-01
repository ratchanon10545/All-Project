'use client';
import React from 'react'
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter , usePathname } from 'next/navigation'

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setError("");
    
            if (!email || !password) {
            setError("Email and password are required.");
            return;
            }
            

            const base64_password = btoa(btoa(password));
            const result = await signIn("credentials", {
              redirect: false,
              email, 
              password : base64_password,
              
            });
            
            if (result?.error) {
                setError(result.error);
                return;
              }
            
            router.replace(pathname);
            router.refresh();
            
          };
  return (
    <div>
         <h2 className="text-2xl font-bold text-center text-gray-700">Sign In</h2>
            {error && <p className="pt-4 pb-4" style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                    Sign In
                </button>
            </form>
            <p className="text-sm text-center text-gray-600 mt-2">
            Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
            </p>
    </div>
  )
}
