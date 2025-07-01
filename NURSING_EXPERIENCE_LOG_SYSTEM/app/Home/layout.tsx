import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import PleaseLogin from '../components/PleaseLogin'
import { redirect } from 'next/navigation'
import Navbar from '../components/Navbar'
import Navbar2 from '../components/Navbar2'

const Layout = async ({children}: {children : React.ReactNode}) => {
  const session = await getServerSession(authOptions)
  if(session?.user){
    if(session?.user.error == "not have"){
        return (
          redirect('/notFoundData')
        )
      }
    else{
        return (
            <div>
              <Navbar2 user={session?.user}/>
              {children}
              </div>
        )
    }
    
  }
  else{
    redirect('/pleaselogin')
  }
}

export default Layout