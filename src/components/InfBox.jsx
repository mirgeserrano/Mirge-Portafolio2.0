import { Download } from "../assets";
import avatar from "../assets/images/Foto.jpg";
import DataCard from "./DataCard";
import InfoCard from "./InfoCard";
 
const InfBox = () => {
  return (
    <div className="col-span-12 lg:col-span-4 hidden lg:block h-screen sticky top-44">
      <div className="w-full mb-6 lg:mb-0 mx-auto relative bg-white text-center dark:bg-[#111111] px-6 rounded-[20px] mt-[180px] md:mt-[220px] lg:mt-0 ">
        <img
          src={avatar}
          alt="Mi imagen"
          className="w-[236px] absolute left-[50%] transform -translate-x-[50%] h-[287px] drop-shadow-xl mx-auto  rounded-[20px] -mt-[140px]"
        />
        <div className="pt-[100px] pb-8 ">
          <h1 className="mt-16 mb-1 text-5xl font-semibold dark:text-white">
            Mirgelys Serrano
          </h1>
          <h2 className="mb-4 text-[#7B7B7B] inline-block dark:bg-[#1D1D1D] px-5 py-1.5 rounded-lg dark:text-[#A6A6A6]  ">
            Developer
          </h2>
          <InfoCard />
          <DataCard />
        

          <div className="inline-flex justify-between items-center mx-auto bg-gradient-to-r from-[#FA5252] to-[#DD2476] duration-200 transition ease-linear hover:bg-gradient-to-l bg-[#DD2476]  px-8 py-3 text-lg text-white rounded-[35px] mt-6">
          <Download />
            <a href="https://drive.usercontent.google.com/u/0/uc?id=177xK4Fpw7VIZBRt3JYbqeDNhZxE_JSfu&export=download" className="p-2">
              Descargar CV
            </a>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfBox;
