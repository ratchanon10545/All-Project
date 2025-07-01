import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dbConfig from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req: Request, { params }: { params:Promise<{ video_id: string }> }) {

    const video_Id = (await params).video_id;
    if (!video_Id) {
      return NextResponse.json({ error: "Video ID is required" }, { status: 400 });
    }
  
    const connection = await mysql.createConnection(dbConfig);
    const [rows]: any = await connection.execute(`SELECT comments.comment_id, comments.user_id , username ,video_id, content,profile_picture,comments.created_at 
                                                  FROM comments
                                                  JOIN users_youtube on users_youtube.user_id = comments.user_id
                                                  WHERE comments.video_id = ?
                                                  ORDER BY comment_id DESC`, [video_Id]);
    await connection.end();
    
    // if (rows.length === 0) {
    //   return NextResponse.json({ error: "User not found" }, { status: 404 });
    // }
  
    return NextResponse.json(rows); // Return the first matching user
  }


  export async function POST(req: Request, { params }: { params: { video_id: string } }) {
    const sessions = await getServerSession(authOptions);
      if (!sessions) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

    const video_id = (await params).video_id;
    const db = await mysql.createConnection(dbConfig);
    const body = await req.json();
    const { content, user_id } = body; // 'like' or 'dislike'
    
    // console.log(content , user_id)
    if(!user_id || user_id == undefined){
      return NextResponse.json({ message: "Please Sign In"  , status : 402});
    }
    try{
      await db.execute("INSERT INTO comments(video_id, user_id, content) VALUES (?,?,?)", 
      [
      video_id,
      user_id,
      content,
     
     ]);

      return NextResponse.json({ message: "Success" });
    }
    catch{
      return NextResponse.json({ message: "fail"  , status : 400});
    }
    
    
  }

  export async function DELETE(req: Request, { params }: { params: { video_id: string } }) {
    const sessions = await getServerSession(authOptions);
      if (!sessions) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    const comment_id = (await params).video_id;
    const db = await mysql.createConnection(dbConfig);
    // return NextResponse.json({ message: "Success" });
    try{
        await db.execute("DELETE FROM comments WHERE comment_id = ?", 
        [
        comment_id
       
       ]);
  
        return NextResponse.json({ message: "Success" });
      }
      catch{
        return NextResponse.json({ message: "fail"  , status : 400});
      }

  }

  export async function PUT(req: Request , { params }: { params: { video_id: string } }) {
    const sessions = await getServerSession(authOptions);
      if (!sessions) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const comment_id = (await params).video_id;
    try {
      const body = await req.json(); // Parse request body
      const { content } = body;
      console.log( content)
      const db = await mysql.createConnection(dbConfig);

      if (!content) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      } 
      
      
      const [result] = await db.query("UPDATE comments SET content = ? WHERE comment_id = ?", [
        content,
        comment_id
      ]);
  
      if ((result as any).affectedRows === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "User updated successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }