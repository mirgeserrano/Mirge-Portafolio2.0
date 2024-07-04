import { Email, Location, Calendar } from "../assets";
import Phone from "../assets/Phone";

const DataCard = () => {
  return (
    <div className="p-7 rounded-2xl mt-7  bg-[#F3F6F6] dark:bg-[#1D1D1D]">

      <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5 ">
        <span 
        className="flex-shrink-0 bg-white dark:bg-black text-[#E93B81] shadow-md h-10 w-10 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out justify-center flex flex-col items-center text-xtiny text-gray-lite dark:text-white hover:text-white hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476]">     
       <Phone />
        </span>
        <div className="text-left ml-2.5">
          <div className="text-xs text-[#44566C] dark:text-[#A6A6A6]">Telefono</div>
          <div className="dark:text-white break-all">
            <div className="hover:text-[#FA5252] duration-300 transition">
              +58 412 7695061
            </div>
          </div>
        </div>
      </div>

      <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
        <span className="flex-shrink-0 bg-white dark:bg-black text-[#E93B81] shadow-md h-10 w-10 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out justify-center flex flex-col items-center text-xtiny text-gray-lite dark:text-white hover:text-white hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476]">
          <Calendar />
        </span>
        <div className="text-left ml-2.5">
          <div className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
            Cumpleaños
          </div>
          <div className="dark:text-white break-all">
            <a className="hover:text-[#FA5252] duration-300 transition">
              Enero 23, 1997
            </a>
          </div>
        </div>
      </div>

      <div className="flex border-b border-[#E3E3E3] dark:border-[#3D3A3A] py-2.5">
        <span className="flex-shrink-0 bg-white dark:bg-black text-[#E93B81] shadow-md h-10 w-10 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out justify-center flex flex-col items-center text-xtiny text-gray-lite dark:text-white hover:text-white hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476]">
          <Location />
        </span>
        <div className="text-left ml-2.5">
          <div className="text-xs text-[#44566C] dark:text-[#A6A6A6]">
            Ubicación
          </div>
          <div className="dark:text-white break-all">
            <a className="hover:text-[#FA5252] duration-300 transition">
              Venezuela, Maracaibo.
            </a>
          </div>
        </div>
      </div>

      <div className="flex py-2.5">
        <span className="flex-shrink-0 bg-white dark:bg-black text-[#E93B81] shadow-md h-10 w-10 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out justify-center flex flex-col items-center text-xtiny text-gray-lite dark:text-white hover:text-white hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476]">
          <Email />
        </span>
        <div className="text-left ml-2.5">
          <div className="text-xs text-[#44566C] dark:text-[#A6A6A6]">Email</div>
          <div className="dark:text-white break-all">
          <div className="hover:text-[#FA5252] duration-300 transition">Mirgeserrano@gmail.com</div>
          </div>
        </div>
      </div>   
    </div>
  );
};

export default DataCard;
