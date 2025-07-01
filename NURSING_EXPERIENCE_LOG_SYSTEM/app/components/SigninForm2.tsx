'use client';
import { Button, Callout, Text } from "@radix-ui/themes";
import Image from 'next/image'
import React from 'react'
// import NuLogo from "../../public/NuLogo.png";
import { GoogleSignInButton } from '../components/googleAuth';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = z.object({
    email: z.string().min(1, 'กรุณากรอก Email').email('Invalid email'),
    password: z.string().min(1, 'กรุณากรอก Password')
  })

const SigninForm2 = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof schema>>({
        resolver:zodResolver(schema)
    })
    const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
        try{
          const signInData = await signIn('credentials',{
            redirect: false,
            email: data.email,
            password : data.password
          })
          if(signInData?.error){
              // setError('Invalid email')
              throw new Error(signInData?.error)
          }else{
              router.push('/Home')
          }
        }  
        catch(error){
          if (error instanceof Error) {
            setError(error.message)
          } else {
            console.log('Unexpected error', error);
          }
        }
      }
    return (
        <div className=" min-h-screen flex justify-center  py-12 px-4 sm:px-6 lg:px-8  bg-no-repeat bg-cover relative items-center">
            <div className="absolute bg-black opacity-10 inset-0 z-0"></div>
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
            <div className="text-center justify-center items-center flex">
                <Image
                    src={'/Nu.png'}
                    width={120}  
                    height={120}
                    alt="Picture"
                />
                
            </div>
            <div className="flex flex-row justify-center items-center space-x-3">
                <GoogleSignInButton/>
            </div>
            <div className="flex items-center justify-center space-x-2">
                <span className="h-px w-16 bg-gray-300"></span>
                <span className="text-gray-500 font-normal">OR</span>
                <span className="h-px w-16 bg-gray-300"></span>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2">
                    {error && <Callout.Root color="red">
                        <Callout.Text>
                        {error}
                        </Callout.Text>
                    </Callout.Root>}
                </div>
                <input type="hidden" name="remember" value="true"/>
                <div className="relative">
                    <label className="text-sm font-bold text-gray-700 tracking-wide">Email</label>
                    <input {...register("email")} className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="email" placeholder="email@nu.ac.th"/>
                </div>
                <div className="">{errors.email && <Text color="red">{errors.email.message}</Text>}</div>
                <div className="mt-8 content-center">
                    <label className="text-sm font-bold text-gray-700 tracking-wide">
                        Password
                    </label>
                    <input {...register("password")} className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="******"/>
                </div>
                <div className="">{errors.password && <Text color="red">{errors.password.message}</Text>}</div>
                <div>
                    <button type="submit" className="w-full flex justify-center bg-orange-600 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-orange-700 shadow-lg cursor-pointer transition ease-in duration-300">
                        Sign in
                    </button>
                </div>
                
            </form>
            </div>
        </div>
      )
}

export default SigninForm2