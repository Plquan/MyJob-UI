import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/Sidebar";
import AdminHeader from "./components/Header";
import { Card } from "antd";


export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col bg-[#f7f7fb]">
        <AdminHeader />
        <main className="p-6">
            <Outlet />
        </main>
      </div>
    </div>
  );
} 