import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import dbConfig from "@/lib/db";
import mysql from "mysql2/promise";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import fs from "fs";
import path from "path";
import { console } from "inspector";

// Directory where uploaded files will be saved
const uploadDir = "./public/uploads";

// Ensure the upload directory exists (create it if needed)
async function ensureDir(dir: string) {
  const fs = require("fs");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const db = await mysql.createConnection(dbConfig);

  let sql;

  if(id != '0') {
    sql = 'videos.user_id != '+id;
    
  }
  else{
    sql = 'videos.user_id is not null';
   
  }
  
  let sql2 = '';
  if(limit){
    sql2 += `LIMIT ${limit}`;
  }

  let offset = 0;
  
  if(page && limit){
    offset = (parseInt(page) - 1) * parseInt(limit);

    sql2 += ` OFFSET ${offset}`;
  }
  const [rows]: any = await db.execute(`SELECT video_id ,users_youtube.user_id ,title,description,video_url, views, videos.created_at ,username , profile_picture
                                        FROM videos 
                                        JOIN users_youtube ON videos.user_id = users_youtube.user_id
                                        WHERE status = 'Public' AND ${sql}
                                        ORDER BY RAND()
                                        ${sql2}
                                        `);
  await db.end();

  return NextResponse.json(rows);
  
  // return NextResponse.json({ message: "Hello from the API!" });
}


export async function POST(req: NextRequest) {
  const sessions = await getServerSession(authOptions);
  if (!sessions) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await ensureDir(uploadDir);

    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    
    const formData = await req.formData(); // Parse the multipart/form-data
    const file = formData.get("video") as File | null;
    const user_id = formData.get("user_id") as string | null;
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const category_id = formData.get("category_id") as string | null;
    const status = formData.get("status") as string | null;

    const db = await mysql.createConnection(dbConfig);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!user_id || !title) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const allowedTypes = ["video/mp4", "video/webm", "video/ogg"];
    const maxFileSize = 50 * 1024 * 1024; // 50 MB

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    if (file.size > maxFileSize) {
      return NextResponse.json({ error: "File size exceeds limit" }, { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name}`;

    const fileBuffer = await file.arrayBuffer(); // Convert file to a buffer
    const filePath = join(uploadDir, fileName); // Save file with its original name

    // Write the file to the upload directory
    await writeFile(filePath, Buffer.from(fileBuffer));

    
    const VideoUrl = `/uploads/${fileName}`;


    await db.execute("INSERT INTO videos (user_id, title, description, category_id , video_url , status) VALUES (?, ?, ?, ?, ?, ?)", [
      user_id,
      title,
      description,
      category_id,
      VideoUrl,
      status,
    ]);

    return NextResponse.json({
      message: "File uploaded successfully",
      filePath: `/uploads/${fileName}`,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}


export async function PUT(req: Request) {
  const sessions = await getServerSession(authOptions);
  if (!sessions) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const video_id = searchParams.get('video_id');
   
  // return NextResponse.json({ message: video_id });
      try {
        const formData = await req.formData();
        const user_id = formData.get("user_id") as string;
        const title = formData.get("title") as string;
        const status = formData.get("status") as File | null;
        const description = formData.get("description") as string;
        const db = await mysql.createConnection(dbConfig);
        

        console.log('Title:', title , 'Status:', status , 'Description:', description);
        // Validate input fields
        if (!title || !status ) {
          return NextResponse.json({ error: "All fields are required, including a profile picture" }, { status: 400 });
        }
          
        // Insert user into the database
        await db.execute("UPDATE videos SET title = ? , description = ? , status = ? WHERE video_id = ?", [
          title,
          description,
          status,
          video_id
        ]);
    
        return NextResponse.json({ message: "Video edit successfully" }, { status: 201 });
      } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
      }
}

export async function DELETE(req: Request) {
  const sessions = await getServerSession(authOptions);
  if (!sessions) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const video_id = searchParams.get('video_id');

  const db = await mysql.createConnection(dbConfig);
  // return NextResponse.json({ message: "Success" });

  try{
    const [rows]: any = await db.execute("SELECT video_url FROM videos WHERE video_id = ? ", [video_id]);
    const video = rows as { video_url: string }[];

    const absolutePath = path.join(process.cwd(), "public", video[0].video_url);

    if (!fs.existsSync(absolutePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    fs.unlinkSync(absolutePath);
    
      await db.execute("DELETE FROM videos WHERE video_id = ?", 
      [
      video_id
     ]);

    return NextResponse.json({ message: "Success"} , { status : 200});
    }
    catch{
      return NextResponse.json({ message: "fail"  , status : 400});
    }

}