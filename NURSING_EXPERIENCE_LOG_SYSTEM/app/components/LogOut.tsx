'use client'

import { Button } from '@radix-ui/themes'
import { signOut } from 'next-auth/react'
import React from 'react'

const LogOut = () => {
  return (
    <div>
        <Button variant='solid' color="red" onClick={()=> signOut({
          redirect: true,
          callbackUrl: '/'
        })}>ออกจากระบบ</Button>
    </div>
    
    
  )
}

export default LogOut