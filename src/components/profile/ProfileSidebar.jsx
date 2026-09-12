import { Download } from "../../assets";
import ContactInfo from "./ContactInfo";
import ImageSelector from "./ImageSelector";
import SocialLinks from "./SocialLinks";

const ProfileSidebar = () => {
  return (
    <div className="profile-column col-span-12 lg:col-span-4 lg:h-screen lg:sticky top-24">
      
     <div className="profile-card w-full mb-6 lg:mb-0 mx-auto relative bg-white text-center dark:bg-[#111111] px-6 rounded-[20px]">
          <ImageSelector/>
        <div className="profile-content pb-8">
          <h1 className="profile-name mb-1 text-5xl font-semibold dark:text-white">
            Mirgelys Serrano
          </h1>
          <h2 className="profile-role mb-4 text-[#7B7B7B] inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg dark:text-[#A6A6A6]">
            Software Engineer
          </h2>
          <SocialLinks />
          <ContactInfo />
          <div className="profile-download inline-flex justify-between items-center mx-auto bg-gradient-to-r from-[#FA5252] to-[#DD2476] duration-200 transition ease-linear hover:bg-gradient-to-l bg-[#DD2476] px-8 py-3 text-lg text-white rounded-[35px] mt-6">
            <Download />
            <a
              href="https://drive.usercontent.google.com/u/0/uc?id=177xK4Fpw7VIZBRt3JYbqeDNhZxE_JSfu&export=download"
              className="p-2"
            >
              Descargar CV
            </a>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
