import { NextResponse } from 'next/server';
import dbConfig from '@/lib/db';
import mysql from 'mysql2/promise';

export async function GET(req: Request) {
    const db = await mysql.createConnection(dbConfig);
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

    // console.log(search_query);
    const [rows]: any = await db.execute(`SELECT username,email,profile_picture,video.video_id,title,video.user_id,description,views,video_url,video.created_at ,ratio 
                                        FROM users_youtube 
                                        JOIN (SELECT videos.video_id,title,videos.user_id,description,video_url,videos.created_at,views, COUNT(likes.like_id)/videos.views as ratio 
                                            FROM videos 
                                            JOIN likes ON likes.video_id = videos.video_id GROUP BY videos.video_id) as video 
                                            ON video.user_id = users_youtube.user_id 
                                        ORDER BY ratio DESC
                                        ${sql2}
                                        `);
    await db.end();
    
    return NextResponse.json(rows);
}

