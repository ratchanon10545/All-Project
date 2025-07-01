'use client';
import { useState } from "react";
import Modal from "./Modal";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from 'next/navigation'
import SignInForm from "./SignInForm";

const SignInButton: React.FC = () => {
    const router = useRouter()
   

    const openModal = () => {
        router.push("?modal=true", { scroll: false }); // Prevents scrolling to top
      };

    return (
        <div>
            <button onClick={openModal} className="bg-red-500 text-white px-4 py-2 rounded-md">Sign In</button>

            <Modal>
                <SignInForm/>
            </Modal>
        </div>
        
    );
};

export default SignInButton;