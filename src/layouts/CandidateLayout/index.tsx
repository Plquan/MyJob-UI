import DefaultHeader from "../components/headers/DefaultHeader";
import DefaultFooter from "../components/footer/DefaultFooter";
import CandidateSidebar from "../components/Sidebar/CandidateSidebar";
import { Outlet } from "react-router-dom";

const CandidateLayout = () => { 

    return (
      <>
      <DefaultHeader />
      <div className=" min-h-screen flex flex-col md:flex-row bg-white">
        <CandidateSidebar/>
        <div className="flex-1 p-4 md:p-5 min-w-0">
        <Outlet />
        </div>
      </div>
        
      </>
    )

}

export default CandidateLayout;
