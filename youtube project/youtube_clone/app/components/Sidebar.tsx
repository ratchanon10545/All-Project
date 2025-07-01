import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SideBarMenu from "./SideBarMenu";

export default async function Sidebar() {
  const session = await getServerSession(authOptions);
    return (
      <aside className="hidden md:block md:fixed top-20 left-0 w-48 h-full  border-gray-300 p-4 ">
        <SideBarMenu session={session} />
      </aside>
    );
  }