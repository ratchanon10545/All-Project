import Recommendations from '../app/components/Recommendations';
import Header from '../app/components/Header';
import Sidebar from '../app/components/Sidebar';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';


export default async function Home() {
  const session = await getServerSession(authOptions);
  
  let id;
  if(!session) {
    id = '0';
  }
  else{
    id = session.user.user_id;
  }
  const video = await fetch(`http://localhost:3000/api/video?id=${id}&page=1&limit=9`);

  const data = await video.json();
  
  return (
    <div className="bg-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="md:ml-52 p-4 w-full mt-24">
          <h2 className="text-2xl font-semibold mb-4">Recommended Videos</h2>
            <Recommendations video={data} id={id} fetchMore_url='http://localhost:3000/api/video?id=' />
        </main>
      </div>
    </div>
  );
}
