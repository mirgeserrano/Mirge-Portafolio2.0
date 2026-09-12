import Navbar from "../components/navigation/Navbar";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ContentNavigation from "../components/navigation/ContentNavigation";
import { Outlet } from "react-router-dom";

const AppLayouts = () => {
  return (
    <div
      className="app-shell bg-fondo dark:bg-fondoDark min-h-screen bg-no-repeat bg-center bg-cover bg-fixed md:pb-16 w-full"
      data-aos="fade"
    >
      <Navbar />
      <div className="app-layout container mx-auto grid grid-cols-12 justify-between">
        <ProfileSidebar />
        <ContentNavigation>
          <Outlet />
        </ContentNavigation>
      </div>
    </div>
  );
};
export default AppLayouts;
