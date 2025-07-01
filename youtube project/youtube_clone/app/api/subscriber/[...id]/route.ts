import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import dbConfig from "@/lib/db";


export async function GET(req: Request, { params }: { params:Promise<{ id: string }> }) {

  const all_Id = (await params).id;
  if (!all_Id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  const channel_Id = all_Id[0];
  const user_Id = all_Id[1];
  const connection = await mysql.createConnection(dbConfig);
  const [rows]: any = await connection.execute(`SELECT * 
                                                FROM subscriptions 
                                                WHERE subscribed_to_id = ? AND 	subscriber_id  =?`
                                                , [channel_Id , user_Id]);
  await connection.end();

  if (rows.length === 0) {
    return NextResponse.json({ subscribe: 0 }, { status: 200 });
  }
  else{
    return NextResponse.json({ subscribe: 1 }, { status: 200 });
  }
//   return NextResponse.json({channel_Id , user_Id} ); // Return the first matching user
}

