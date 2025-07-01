import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dbConfig from "@/lib/db";

// GET /api/user/:id
export async function GET(req: Request, { params }: { params:Promise<{ video_id: string }> }) {

  const videoId = (await params).video_id;
  if (!videoId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const connection = await mysql.createConnection(dbConfig); 
  const [rows]: any = await connection.execute(`SELECT  likes.video_id ,likes.user_id ,title,description,video_url, views, likes.created_at ,username , profile_picture,follower , likes, COUNT(dislike_id) as dislikes
                                                FROM dislikes
                                                RIGHT JOIN (SELECT video_data.video_id ,video_data.user_id ,title,description,video_url, views, video_data.created_at ,username , profile_picture,follower , COUNT(like_id) as likes
                                                            FROM likes 
                                                            RIGHT JOIN (SELECT video_id ,test.user_id ,title,description,video_url, views, test.created_at ,username , profile_picture, COUNT(subscriptions.subscribed_to_id) as follower
                                                                        FROM subscriptions
                                                                        JOIN (SELECT  video_id ,users_youtube.user_id ,title,description,video_url, views, videos.created_at ,username , profile_picture
                                                                              FROM videos
                                                                              JOIN users_youtube ON users_youtube.user_id = videos.user_id
                                                                              WHERE videos.video_id = ?) as test
                                                                        ON subscriptions.subscribed_to_id = test.user_id) as video_data
                                                            ON likes.video_id = video_data.video_id ) as likes
                                                ON dislikes.video_id = likes.video_id`, [videoId]);
  await connection.end();
  
  if (rows.length === 0) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  return NextResponse.json(rows[0]); // Return the first matching user
}
