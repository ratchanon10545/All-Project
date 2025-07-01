import { NextResponse } from "next/server";
import dbConfig from "@/lib/db";
import mysql from "mysql2/promise";


// Increment likes
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const id = (await params).id;
  const postId = parseInt(id);
  const db = await mysql.createConnection(dbConfig);
  const body = await req.json();
  const { action , user_id } = body; // 'like' or 'dislike'

  if (action === "like") {
    let liked = ''
    const [existingDisLike] = await db.execute("SELECT * FROM dislikes WHERE user_id = ? AND video_id = ?", [user_id , postId]);
    const [existingUser] = await db.execute("SELECT * FROM likes WHERE user_id = ? AND video_id = ?", [user_id , postId]);

    if (Array.isArray(existingDisLike) && existingDisLike.length > 0) {
        await db.execute("DELETE FROM dislikes WHERE video_id = ? AND user_id = ? ", [
            postId ,
            user_id
           ]);
         liked = 'liked'
      }

    if (Array.isArray(existingUser) && existingUser.length > 0) {
        return NextResponse.json({ error: "already like" }, { status: 200 });
      }

    await db.execute("INSERT INTO likes (video_id, user_id) VALUES (?, ?)", [
       postId ,
       user_id
      ]);
      return NextResponse.json({ message: "Success" ,action,liked});
  } else if (action === "dislike") {
    let liked = ''
    const [existingLike] = await db.execute("SELECT * FROM likes WHERE user_id = ? AND video_id = ?", [user_id , postId]);
    const [existingUser] = await db.execute("SELECT * FROM dislikes WHERE user_id = ? AND video_id = ?", [user_id , postId]);

    if (Array.isArray(existingLike) && existingLike.length > 0) {
        await db.execute("DELETE FROM likes WHERE video_id = ? AND user_id = ? ", [
            postId ,
            user_id
           ]);
        liked = 'liked'
      }

    if (Array.isArray(existingUser) && existingUser.length > 0) {
        return NextResponse.json({ error: "already dislike" }, { status: 200 });
      }

    await db.execute("INSERT INTO dislikes (video_id, user_id) VALUES (?, ?)", [
       postId ,
       user_id
      ]);
      return NextResponse.json({ message: "Success" ,action ,liked});
  } else {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  
}
