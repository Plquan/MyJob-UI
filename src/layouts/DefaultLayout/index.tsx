import DefaultHeader from "../components/headers/DefaultHeader";
import DefaultFooter from "../components/footer/DefaultFooter";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => { 

    return (
      <>
        <DefaultHeader />
        <div className="pt-16">
          <Outlet />
        </div>
        <DefaultFooter />
      </>
    )

}

export default DefaultLayout;
