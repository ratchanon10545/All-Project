import { GoogleSignInButton } from '@/app/components/googleAuth'
import Signin from '@/app/components/signinForm'
import axios from 'axios'
import Image from 'next/image'
import SigninForm2 from './components/SigninForm2'


export default async function Home() {
  return (
    <div className=''>
      <SigninForm2/>
    </div>
  )
}
