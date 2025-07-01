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
  const [rows]: any = await connection.execute(`SELECT COUNT(subscriptions.subscribed_to_id) as subscibers ,
                                                COUNT(CASE WHEN MONTH(CURDATE())-1 = MONTH(subscriptions.created_at) then 1  end) as subscibers_lastmonth,
                                                COUNT(CASE WHEN MONTH(CURDATE()) = MONTH(subscriptions.created_at) then 1  end) as subscibers_thismonth,
                                                totalcomments , comments_lastmonth, comments_thismonth , likes,likes_lastmonth,likes_thismonth,
                                                views , views_lastmonth , views_thismonth
                                                FROM subscriptions
                                            JOIN (SELECT COUNT(comments.comment_id) as totalcomments,
                                                COUNT(CASE WHEN MONTH(CURDATE())-1 = MONTH(comments.created_at) then 1  end) as comments_lastmonth,
                                                COUNT(CASE WHEN MONTH(CURDATE()) = MONTH(comments.created_at) then 1  end) as comments_thismonth
                                                FROM videos
                                                JOIN comments ON videos.video_id = comments.video_id
                                                WHERE videos.user_id = ?) as test
                                            JOIN (SELECT COUNT(likes.like_id) as likes,
                                                    COUNT(CASE WHEN MONTH(CURDATE())-1 = MONTH(likes.created_at) then 1  end) as likes_lastmonth,
                                                COUNT(CASE WHEN MONTH(CURDATE()) = MONTH(likes.created_at) then 1  end) as likes_thismonth
                                            FROM likes
                                            JOIN videos
                                            ON likes.video_id = videos.video_id
                                            WHERE videos.user_id = ? ) as likes
                                            JOIN (SELECT COUNT(video_views.video_id) as views,
                                            COUNT(CASE WHEN MONTH(CURDATE())-1 = MONTH(video_views.view_time) then 1  end) as views_lastmonth,
                                                COUNT(CASE WHEN MONTH(CURDATE()) = MONTH(video_views.view_time) then 1  end) as views_thismonth
                                            FROM video_views
                                            JOIN videos
                                            ON video_views.video_id = videos.video_id
                                            WHERE videos.user_id = ? ) as views
                                            WHERE subscriptions.subscribed_to_id = ?`, [user_id , user_id , user_id ,user_id]);
  await connection.end();
  
  if (rows.length === 0) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  return NextResponse.json(rows[0]); // Return the first matching user
}
