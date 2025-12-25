import DefaultHeader from "./components/Header";
import DefaultFooter from "./components/Footer";
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
