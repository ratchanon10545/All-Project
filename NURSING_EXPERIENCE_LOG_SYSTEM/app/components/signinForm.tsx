'use client';

import { Button, Callout, Text } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form"
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";


const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required')
})


export default function Signin() {
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
    <div className="py-5">
        <h1 className="py-3">LogIn</h1>
        <div className="py-2">
        {error && <Callout.Root color="red">
            <Callout.Text>
              {error}
            </Callout.Text>
          </Callout.Root>}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div><input 
          className="border-2 border-gray-500 rounded-md"
          placeholder="Email" {...register("email")} /></div>
          <div className=" py-2">{errors.email && <Text color="red">{errors.email.message}</Text>}</div>
          <div><input type="password"
          className="border-2 border-gray-500 rounded-md"
          placeholder="password"{...register("password")} /></div>
          <div className="py-2">{errors.password && <Text color="red">{errors.password.message}</Text>}</div>
          <div className="flex justify-end">
            <Button variant="solid" color="green" className="p-5">
              Signin
            </Button>
          </div>
        </form>
    </div>
  )
}


