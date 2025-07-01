import NextAuth, { AuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import dbConfig from "@/lib/db";

declare module "next-auth" {
  interface Session {
    user: {
      user_id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      profilePicture?: string | null;
    };
  }
}

declare module "next-auth" {
  interface User {
    profilePicture?: string | null;
  }
}

export const authOptions: AuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "example@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and Password are required");
          }
          
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(credentials.email)) {
            throw new Error("Invalid email format");
          }
          try {
            const db = await mysql.createConnection(dbConfig);
            const [rows] = await db.execute("SELECT * FROM users_youtube WHERE email = ?", [credentials.email]);
  
            if (!Array.isArray(rows) || rows.length === 0) {
              throw new Error("User not found");
            }
  
            const user = rows[0] as { user_id: number; username: string; email: string; password_hash: string , profile_picture: string };
            
            const isValidPassword = await bcrypt.compare(credentials.password, user.password_hash);
            if (!isValidPassword) {
              throw new Error("Invalid password");
            }
            
            return { id: user.user_id.toString(), name: user.username, email: user.email , profilePicture: user.profile_picture };
          } catch (error) {
            console.error("Authorize Error:", error);
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            throw new Error(errorMessage);
          }
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async session({ session, token }) {
        if (!token) return session;
        if (session.user && token) {
          session.user.user_id = token.id as string;
          session.user.name = token.name as string;
          session.user.email = token.email as string;
          session.user.profilePicture = token.profilePicture as string;
        }
        // if (token) {
        //   session.user.id = token.id;
        // }
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          
          token.id = user.id;
          token.username = user.name;
          token.email = user.email;
          token.profilePicture = user.profilePicture;
          
        }
        return token;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  };
  
  const handler = NextAuth(authOptions);
  
  export { handler as GET, handler as POST };