// pages/dashboard.js
import React from 'react';
import Head from 'next/head';
import { Users, ThumbsUp,Eye , MessageSquareCode } from 'lucide-react';
import Chart from '../components/Studio/Chart';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { formatNumber } from '@/lib/formatnumber';


interface MonthData {
  month : string;
  views : number;
  likes : number;
}

const Dashboard = async () => {

const sessions = await getServerSession(authOptions);
// console.log(sessions);
const viewsData : MonthData[] = await fetch(`http://localhost:3000/api/views/countmonth?user_id=${sessions?.user.user_id}`).then(res => res.json());

const totalData  = await fetch(`http://localhost:3000/api/analytics?user_id=${sessions?.user.user_id}`).then(res => res.json());

const topVideos = await fetch(`http://localhost:3000/api/video/topviews?user_id=${sessions?.user.user_id}&limit=3`).then(res => res.json());
// console.log(totalData);
//  console.log(viewsData);
const diffviews = ((totalData.views - totalData.views_lastmonth)/totalData.views_lastmonth)*100;
const diffsubscibers = ((totalData.subscibers - totalData.subscibers_lastmonth)/totalData.subscibers_lastmonth)*100;
const diffcomments = ((totalData.totalcomments - totalData.comments_lastmonth)/totalData.comments_lastmonth)*100;

const engagement = ((totalData.likes + totalData.totalcomments) / (totalData.subscibers + totalData.views))*100;
const engagement_lastmonth = ((totalData.likes_lastmonth + totalData.comments_lastmonth) / (totalData.subscibers_lastmonth + totalData.views_lastmonth))*100;

const diffengagement = ((engagement - engagement_lastmonth)/engagement_lastmonth)*100;
  return (
    <div className="bg-white h-screen ">

      <div className="flex h-screen ">
      
        {/* Main Content */}
        <div className="flex-1 p-8 ">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 ">
            <h1 className="text-2xl font-bold text-gray-800">Channel Analytics</h1>
            
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
                  <p className="text-2xl font-bold text-gray-800">{formatNumber (totalData.views)}</p>
                  <p className={`text-xs ${diffviews >=0 ? 'text-green-500' : 'text-red-500'}`}>{diffviews >=0 ? '+' : ''}{diffviews.toFixed(2)}% from last month</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Subscribers</h3>
                  <p className="text-2xl font-bold text-gray-800">{formatNumber(totalData.subscibers)}</p>
                  <p className={`text-xs ${diffsubscibers >=0 ? 'text-green-500' : 'text-red-500'}`}>{diffsubscibers >=0 ? '+' : ''}{diffsubscibers.toFixed(2)}% from last month</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-full">
                  <MessageSquareCode className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Total Comments</h3>
                  <p className="text-2xl font-bold text-gray-800">{formatNumber(totalData.totalcomments)}</p>
                  <p className={`text-xs ${diffcomments >=0 ? 'text-green-500' : 'text-red-500'}`}>{diffcomments >=0 ? '+' : ''}{diffcomments.toFixed(2)}% from last month</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-full">
                  <ThumbsUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Engagement</h3>
                  <p className="text-2xl font-bold text-gray-800">{engagement.toFixed(2)}%</p>
                  <p className={`text-xs ${diffengagement >=0 ? 'text-green-500' : 'text-red-500'}`}>{diffengagement >=0 ? '+' : ''}{diffengagement.toFixed(2)}% from last month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="w-full">
            {/* Views Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Views - Last 12 Months</h2>
              <div className="h-64">
                {/* In a real implementation, this would be a actual chart component */}
                <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                    <Chart data={viewsData} />
                </div>  
              </div>
            </div>

            {/* Audience Demographics */}
           

            {/* Top Performing Videos */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Videos</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Video</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likes</th>
                      
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {topVideos.map((video : any) => (
                      <tr key={video.video_id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-17 h-12 bg-gray-200">
                              <video src={video.video_url} className=' rounded h-full w-full'></video>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{video.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatNumber(video.views)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatNumber(video.likes)}</td>
                        
                      </tr>
                    ))}
                   
                  </tbody>
                </table>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;