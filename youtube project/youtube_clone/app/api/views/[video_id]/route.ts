import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dbConfig from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export async function POST(req: Request, { params }: { params: { video_id: string } }) {
    const sessions = await getServerSession(authOptions);
      if (!sessions) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

    const video_id = (await params).video_id;
    const db = await mysql.createConnection(dbConfig);
    const body = await req.json();
    const { views } = body; // 'like' or 'dislike'
    const update_views = views + 1
    try{
      await db.execute("INSERT INTO video_views(video_id, user_id) VALUES (?,?)", 
      [
      video_id,
        sessions.user.user_id,
     
     ]);

     const [result] = await db.query("UPDATE videos SET views = ? WHERE video_id= ?", [
        update_views,
        video_id
      ]);
  
      if ((result as any).affectedRows === 0) {
        return NextResponse.json({ error: "Video not found" }, { status: 404 });
      }

      return NextResponse.json({ message: "Success" });
    }
    catch{
      return NextResponse.json({ message: "fail"  , status : 400});
    }
}