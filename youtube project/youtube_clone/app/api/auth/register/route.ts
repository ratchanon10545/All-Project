import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import dbConfig from "@/lib/db";
import multer from "multer";
import path from "path";
import { writeFile } from "fs/promises";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  image: File;
}

// export async function POST(req: Request) {
//   try {
//     const { name, email, password , image }: RegisterRequest = await req.json();

//     console.log(image);
//     // if (!name || !email || !password) {
//     //   return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//     // }

//     // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     // if (!emailRegex.test(email)) {
//     //   return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
//     // }

//     // const hashedPassword = await bcrypt.hash(password, 10);
//     // const db = await mysql.createConnection(dbConfig);

//     // // Check if the user already exists
//     // const [existingUser] = await db.execute("SELECT * FROM users_youtube WHERE email = ?", [email]);

//     // if (Array.isArray(existingUser) && existingUser.length > 0) {
//     //   return NextResponse.json({ error: "User already exists" }, { status: 400 });
//     // }

//     // // Insert new user
//     // await db.execute("INSERT INTO users_youtube (username, email, password_hash) VALUES (?, ?, ?)", [
//     //   name,
//     //   email,
//     //   hashedPassword,
//     // ]);

//     return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
//   } catch (error) {
//     console.error("Registration Error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confrim_password = formData.get("confrime_password") as string;
    const file = formData.get("profilePicture") as File | null;

    // Validate input fields
    if (!name || !email || !password || !file) {
      return NextResponse.json({ error: "All fields are required, including a profile picture" }, { status: 400 });
    }

    if(password !== confrim_password){
      return NextResponse.json({ error: "Password and Confrime Password must be same" }, { status: 400 });;
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
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/profile", fileName);

    await writeFile(filePath, buffer);

    const profilePictureUrl = `/profile/${fileName}`;

    const hashedPassword = await bcrypt.hash(password, 10);
    const db = await mysql.createConnection(dbConfig);

    // Check if email already exists
    const [existingUser] = await db.execute("SELECT * FROM users_youtube WHERE email = ?", [email]);

    if (Array.isArray(existingUser) && existingUser.length > 0) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Insert user into the database
    await db.execute("INSERT INTO users_youtube (username, email, password_hash, profile_picture) VALUES (?, ?, ?, ?)", [
      name,
      email,
      hashedPassword,
      profilePictureUrl,
    ]);

    return NextResponse.json({ message: "User registered successfully", profilePicture: profilePictureUrl }, { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}