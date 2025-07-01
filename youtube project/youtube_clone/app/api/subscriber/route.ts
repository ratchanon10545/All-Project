import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dbConfig from "@/lib/db";

// POST /api/subscriber
export async function POST(request: Request) {
    try {
      // Parse the incoming request body (assuming JSON data)
      const body = await request.json();
  
      // Example: Perform some logic with the parsed data
      const { channel_id, user_id } = body;
  
      if (!channel_id || !user_id) {
        return NextResponse.json(
          { message: 'Channel id and user id are required.' },
          { status: 400 }
        );
      }
      const db = await mysql.createConnection(dbConfig);

      const [existingSub] = await db.execute("SELECT * FROM subscriptions WHERE subscriber_id = ? AND subscribed_to_id = ?", [user_id, channel_id]);

      if (Array.isArray(existingSub) && existingSub.length > 0) {
        return NextResponse.json({ error: "already subscriber" }, { status: 400 });
      }

      await db.execute("INSERT INTO subscriptions (subscriber_id, subscribed_to_id) VALUES (?, ?)", [
        user_id,
        channel_id,
      ]);

      return NextResponse.json(
        { message: 'Data submitted successfully!', success: true },
        { status: 200 }
      );
    } catch (error) {
      console.error('Error handling POST request:', error);
  
      return NextResponse.json(
        { message: 'Internal Server Error', success: false },
        { status: 500 }
      );
    }
  }