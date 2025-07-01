import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dbConfig from "@/lib/db";

// GET /api/user/:id
export async function GET(req: Request, { params }: { params:Promise<{ id: string }> }) {

  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  let sql2 = '';
  if(limit){
    sql2 += `LIMIT ${limit}`;
  }

  let offset = 0;
  
  if(page && limit){
    offset = (parseInt(page) - 1) * parseInt(limit);

    sql2 += ` OFFSET ${offset}`;
  }

  const userId = (await params).id;
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const connection = await mysql.createConnection(dbConfig); 
  const [rows]: any = await connection.execute(`SELECT *
                                                FROM (SELECT videos.video_id , videos.user_id , title , description ,  video_url ,thumbnail_url ,views ,videos.created_at , status, COUNT(likes.like_id) as likes 
                                                FROM videos
                                                JOIN likes ON likes.video_id = videos.video_id
                                                WHERE videos.user_id = ?                                            
                                                GROUP BY video_id

                                                UNION ALL

                                                SELECT videos.video_id , videos.user_id , title , description , video_url ,thumbnail_url ,views ,videos.created_at, status , 0 as likes 
                                                FROM videos
                                                WHERE videos.user_id = ?) as video
                                                GROUP BY video.video_id
                                                ORDER BY video.video_id DESC ${sql2}`, [userId , userId]);
  
  
  const [result]: any = await connection.execute("SELECT COUNT(*) as total FROM videos WHERE user_id = ?", [userId]);
  const total = result[0]?.total || 0;
  const totalPages = Math.ceil(total / parseInt(limit || "0"));

  await connection.end();
  // if (rows.length === 0) {
  //   return NextResponse.json({ error: "Video not found" }, { status: 404 });
  // }

  return NextResponse.json({data: rows , totalPages }); // Return the first matching user
}

