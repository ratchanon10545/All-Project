import NextAuth from "next-auth"

declare module "next-auth" {
    interface User{
        role : string
    }
    interface Session {
        user: user & {
            role : string
        }
        token:{
            role: string
        }
    }
    interface Profile{
        email_verified  : boolean
    }
    
}