import { Outlet } from "react-router-dom";
import CompanyHeader from "../components/headers/CompanyHeader";
import CompanySidebar from "../components/Sidebar/CompanySidebar";


export default function CompanyLayout() {
  return (
    <div className="flex min-h-screen">
      <CompanySidebar />
      <div className="flex-1 flex flex-col bg-[#f7f7fb]">
        <CompanyHeader />
        <main className="p-6">
          <div className="bg-white rounded-lg p-6 shadow mb-6 min-h-[400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
} 