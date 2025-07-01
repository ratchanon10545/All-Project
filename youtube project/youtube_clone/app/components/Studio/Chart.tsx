'use client';
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MonthData {
  month : string;
  views : number;
  likes : number;
}

export default function Chart({data} : {data : MonthData[]}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
            top: 20,
            right: 50,
            left: 5,
            bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="views" strokeWidth={5} stroke="red" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="likes" strokeWidth={2}  stroke="black" />
        </LineChart>
    </ResponsiveContainer>
  )
}
