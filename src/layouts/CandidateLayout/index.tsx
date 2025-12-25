import DefaultHeader from "../DefaultLayout/components/Header";
import CandidateSidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const CandidateLayout = () => { 
  // pt-16 pl-0 md:pl-64
    return (
      <>
      <DefaultHeader />
      <div className="pt-16 pl-0 md:pl-64 min-h-screen flex flex-col md:flex-row bg-white">
        <CandidateSidebar/>
        <div className=" flex-1 p-4 md:p-5 min-w-0">
        <Outlet />
        </div>
      </div>
        
      </>
    )

}

export default CandidateLayout;
