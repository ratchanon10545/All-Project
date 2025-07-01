import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dbConfig from "@/lib/db";

// GET /api/user/:id
export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get('user_id');
  const limit = searchParams.get('limit');

  let sql2 = '';
  if(limit){
    sql2 += `LIMIT ${limit}`;
  }

  if (!user_id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const connection = await mysql.createConnection(dbConfig); 
  const [rows]: any = await connection.execute(`SELECT *
                                                FROM (SELECT videos.video_id ,title,video_url , views  , count(likes.like_id) as likes FROM videos 
                                                JOIN likes ON videos.video_id = likes.video_id
                                                WHERE videos.user_id = ?
                                                GROUP BY videos.video_id

                                                UNION ALL

                                                SELECT  videos.video_id ,title,video_url , views  , 0 as likes FROM videos 
                                                WHERE videos.user_id = ?) as videos

                                                GROUP BY videos.video_id
                                                ORDER BY videos.views DESC
                                                ${sql2}`, [user_id , user_id]);
  await connection.end();
  
  // if (rows.length === 0) {
  //   return NextResponse.json({ error: "Video not found" }, { status: 404 });
  // }

  return NextResponse.json(rows); // Return the first matching user
}
