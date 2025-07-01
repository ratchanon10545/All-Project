import React from 'react'
import axios from 'axios'
import config from '@/app/config';
import { FormProvider } from '@/app/components/NewLog/FormContext';
import { FormStep } from '@/app/components/NewLog/FormStep';
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import CheckLogin from '@/app/components/CheckLogin';
import PleaseLogin from '@/app/components/PleaseLogin';




export default async function page () {
  const check = await CheckLogin()
  if (check){
    const titles = await axios.get(`${config.apiUrl}/api/dataskills`)
    const place = await axios.get(`${config.apiUrl}/api/place`)
    const approver = await axios.get(`${config.apiUrl}/api/approver`)
    const session = await getServerSession(authOptions)
    return(
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="space-y-6">
          <FormProvider>
            <FormStep
              title = {titles.data}
              place={place.data}
              approver={approver.data.approver}
              session={session}
            />
            
          </FormProvider>
      </div>
    </main>
  )
  }
  else{
    return <PleaseLogin></PleaseLogin>
  }
}

