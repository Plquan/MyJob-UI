import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Sidebar/AdminSidebar";
import AdminHeader from "../components/headers/AdminHeader";


export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col bg-[#f7f7fb]">
        <AdminHeader />
        <main className="p-6">
          <div className="bg-white rounded-lg p-6 shadow mb-6 min-h-[400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
} 