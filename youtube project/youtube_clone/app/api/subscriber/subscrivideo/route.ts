import { NextResponse } from 'next/server';
import dbConfig from '@/lib/db';
import mysql from 'mysql2/promise';

export async function GET(req: Request) {
    const db = await mysql.createConnection(dbConfig);
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get('user_id');
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
    const [rows]: any = await db.execute(`SELECT username,email,profile_picture,videos.video_id , videos.user_id, videos.title , video_url , views , videos.created_at 
                                          FROM users_youtube 
                                          JOIN (SELECT videos.video_id , videos.user_id, videos.title , video_url , views , videos.created_at 
                                                FROM videos 
                                                JOIN subscriptions ON subscriptions.subscribed_to_id = videos.user_id 
                                                WHERE subscriptions.subscriber_id = ? AND videos.status = 'Public' ) 
                                                as videos 
                                          ON videos.user_id = users_youtube.user_id ORDER BY videos.video_id DESC
                                        ${sql2}
                                        `,[user_id]);
    await db.end();
    
    return NextResponse.json(rows);
}

