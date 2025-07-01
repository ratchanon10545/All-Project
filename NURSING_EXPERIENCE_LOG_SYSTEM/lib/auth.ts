import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import prisma from "@/prisma/client";
import { boolean, string } from "zod";

export const authOptions: NextAuthOptions = {
    adapter : PrismaAdapter(prisma),
    session:{
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn: '/',
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "email", type: "email" },
            password: { label: "password", type: "password" }
          },
          async authorize(credentials) {
            if(!credentials?.email || !credentials.password){
                return null
            }
            
            const existingEmail2 = await prisma.test.findUnique({
                where:{ email: credentials.email}
            })
            if (!existingEmail2){
                throw new Error('Email ไม่ถูกต้อง')
                
            }

            const passwordMatch = await compare(credentials.password, existingEmail2.password)

            if (!passwordMatch){
                throw new Error('Password ไม่ถูกต้อง')
            }

            return {
                id: `${existingEmail2.id}`,
                name: existingEmail2.name,
                email:existingEmail2.email,
                role:existingEmail2.role
            }
          }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID! ,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            }
          })
      ],
    callbacks:{
        async jwt({ token, user}) {
            if(user){
                const test = user.email
                if(test === null){
                    return token 
                }
                const existingEmail = await prisma.test.findUnique({
                    where:{ email: test}
                })
                if(existingEmail){
                    return{
                        ...token,
                        role: existingEmail.role,
                        id : existingEmail.id,
                        error: "good",
                        name : existingEmail.name
                    }
                }
                return{
                    ...token,
                    role: user.role,
                    id : user.id,
                    error: "not have"
                }
            }
            return token
        },
        async session({ session, user, token }) {
            return{
                ...session,
                user:{
                    ...session.user,
                    role: token.role,
                    id : token.id,
                    error : token.error
                }
            }
            
        },

        async signIn({ account, profile }) {
            if (account?.provider === "google" &&
            profile?.email_verified && profile.email?.endsWith("@nu.ac.th")) {
               return true
            }
            if(account?.provider === "credentials"){
                return true
            }
            return false
        }
    }
}
