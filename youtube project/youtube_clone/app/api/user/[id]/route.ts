import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dbConfig from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import path from "path";
import { writeFile } from "fs/promises";
import { profile } from "console";
import fs from "fs";

// GET /api/user/:id
export async function GET(req: Request, { params }: { params:Promise<{ id: string }> }) {

  const userId = (await params).id;
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const connection = await mysql.createConnection(dbConfig);
  const [rows]: any = await connection.execute(`SELECT user_id , username , email ,profile_picture , COUNT(subscriptions.subscribed_to_id) as follower
                                                FROM users_youtube
                                                LEFT JOIN subscriptions ON users_youtube.user_id = subscriptions.subscribed_to_id
                                                WHERE users_youtube.user_id = ?`, [userId]);
  await connection.end();
  
  if (rows.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(rows[0]); // Return the first matching user
}

export async function PUT(req: Request, { params }: { params:Promise<{ id: string }> }) {
  const userId = (await params).id;
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const sessions = await getServerSession(authOptions);
      if (!sessions) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      try {
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const file = formData.get("profilePicture") as File | null;
        const db = await mysql.createConnection(dbConfig);
        const [rows]: any = await db.execute("SELECT profile_picture FROM users_youtube WHERE user_id = ? ", [userId]);
        const User = rows as { profile_picture: string }[];

        // const profile = User[0].profile_picture
        // console.log(User[0].profile_picture)
        // Validate input fields
        if (!name || !email ) {
          return NextResponse.json({ error: "All fields are required, including a profile picture" }, { status: 400 });
        }
        
        if (name.length < 3) {
          return NextResponse.json({ error: "Name must be at least 3 characters" }, { status: 400 });
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }
    
        // if (password.length < 6) {
        //   return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
        // }
    
        // Save profile picture
        let profilePictureUrl = User[0].profile_picture;
        if(file){
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const fileName = `${Date.now()}-${file.name}`;
          const filePath = path.join(process.cwd(), "public/profile", fileName);
          await writeFile(filePath, buffer);
          
          const absolutePath = path.join(process.cwd(), "public", User[0].profile_picture);
          fs.unlinkSync(absolutePath);

          profilePictureUrl = `/profile/${fileName}`;
        }
        
        
    
        // Check if email already exists
        const [existingUser] = await db.execute("SELECT * FROM users_youtube WHERE email = ? AND user_id != ? ", [email , userId]);
    
        if (Array.isArray(existingUser) && existingUser.length > 0) {
          return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }
    
        // Insert user into the database
        await db.execute("UPDATE users_youtube SET username = ? , email = ? , profile_picture = ? WHERE user_id = ?", [
          name,
          email,
          profilePictureUrl,
          sessions.user.user_id
        ]);
    
        return NextResponse.json({ message: "User profile edit successfully" }, { status: 201 });
      } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
      }
}