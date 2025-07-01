import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import NotFound from '../notFoundData/page'
import StudentPage from '../components/Home/student'
import AdminPage from '../components/Home/admin'
import ApproverPage from '../components/Home/approver'
import PleaseLogin from '../components/PleaseLogin'
import { redirect } from 'next/navigation'




const HomePage = async () => {
  const session = await getServerSession(authOptions)
  
  if(session?.user){
    if(session?.user.error == "not have"){
      return (
        redirect('/notFoundData')
      )
    }
    else{
      if(session?.user.role == "STUDENT"){
        return (
        <div>
            <StudentPage/>
          </div>
        )
      }
      else if(session?.user.role == "APPROVER"){
          return (
          <div><ApproverPage></ApproverPage></div>
          )
      }
      else{
        redirect('/dashboard')
          // return (
          //     <div><AdminPage></AdminPage></div>
          // )
      }
    }
    
  }
  return (
    <div><PleaseLogin/></div>
  )
}

export default HomePage