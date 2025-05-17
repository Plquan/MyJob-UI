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
        <Outlet />
      </div>
        
      </>
    )

}

export default CandidateLayout;
