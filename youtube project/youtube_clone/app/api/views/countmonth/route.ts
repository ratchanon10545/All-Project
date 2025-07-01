import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dbConfig from "@/lib/db";


// GET /api/user/:id
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
  const id = searchParams.get('user_id');
//   const sessions = await getServerSession(authOptions);
//   console.log(sessions);
    if (!id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  const user_id = id;
//   console.log(user_id);
  const connection = await mysql.createConnection(dbConfig); 
  const [rows]: any = await connection.execute(`SELECT qrymain.month , views , likes
                                                FROM (	SELECT MONTHNAME(video_views.view_time) as month, COUNT(video_views.video_id) as views,video_views.view_time as time
                                                        FROM video_views
                                                      JOIN videos 
                                                        ON videos.video_id = video_views.video_id
                                                        WHERE videos.user_id = ? AND YEAR(video_views.view_time) = YEAR(CURDATE())
                                                        GROUP BY MONTH(video_views.view_time)
                                                        UNION ALL
                                                        SELECT MONTHNAME(month) as month, 0 as views , month as time
                                                        FROM monthtemp) as qrymain
                                                JOIN (SELECT MONTHNAME(likes.created_at) as month, COUNT(likes.like_id) as likes,likes.created_at as likes_time 
                                                    FROM likes
                                                    JOIN videos 
                                                     ON videos.video_id = likes.video_id
                                                     WHERE videos.user_id = ? AND YEAR(likes.created_at) = YEAR(CURDATE())
                                                    GROUP BY MONTH(likes.created_at)
                                                    UNION ALL
                                                    SELECT MONTHNAME(month) as month, 0 as likes , month as likes_time
                                                    FROM monthtemp
                                                    ) as likes
                                                ON MONTH(likes.likes_time) = MONTH(time)
                                                GROUP BY month  
                                                ORDER BY time`, [user_id , user_id]);
  await connection.end();
  
  if (rows.length === 0) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  return NextResponse.json(rows); // Return the first matching user
}
