import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const CheckLogin = async () => {
    const session = await getServerSession(authOptions)
    if(session?.user){
        return true
    }
    else{
        return false
    }
 
}

export default CheckLogin