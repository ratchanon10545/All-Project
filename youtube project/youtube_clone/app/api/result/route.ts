import { NextResponse } from 'next/server';
import dbConfig from '@/lib/db';
import mysql from 'mysql2/promise';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const search_query = searchParams.get('search_query');
    const db = await mysql.createConnection(dbConfig);

    // console.log(search_query);
    const [rows]: any = await db.execute(`SELECT video_id, users_youtube.user_id ,title,description,video_url, views, videos.created_at ,username , profile_picture FROM videos 
                                        JOIN users_youtube on videos.user_id = users_youtube.user_id 
                                        WHERE title LIKE '%${search_query}%' AND status = 'Public'`);
    await db.end();
    
    return NextResponse.json(rows);
}

