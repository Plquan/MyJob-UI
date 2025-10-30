import { Outlet } from "react-router-dom";
import CompanyHeader from "./components/Header";
import CompanySidebar from "./components/Sidebar";

export default function EmployerLayout() {
  return (
    <div className="flex min-h-screen">
      <CompanySidebar />
      <div className="flex-1 flex flex-col bg-[#f7f7fb]">
        <CompanyHeader />
        <main className="p-6">
            <Outlet />
        </main>
      </div>
    </div>
  );
} 