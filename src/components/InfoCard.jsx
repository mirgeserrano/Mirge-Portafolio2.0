import Github from "../assets/Github";
import Linkedin from "../assets/Linkedin";
import Telegram from "../assets/Telegram";

const InfoCard = () => {
  return (
    <div className="w-full mb-6 lg:mb-0 mx-auto relative bg-white text-center dark:bg-[#111111] px-6 rounded-[20px] mt-[180px] md:mt-[220px] lg:mt-0 ">
      <div className="flex justify-center space-x-3 ">
        <a href="https://www.linkedin.com/in/mirgelys-serrano-b232a4106/">
          <span className="w-full h-10 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out font-poppins bg-[#F3F6F6] font-medium mx-2.5 text-xtiny text-gray-lite dark:text-[#A6A6A6] justify-center flex flex-col items-center transition-all duration-300 ease-in-out dark:hover:text-white dark:bg-[#212425] hover:text-white   hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476]">
            <Linkedin />
          </span>
        </a>
        <a href="https://github.com/mirgeserrano">
          <span className="w-full h-10 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out font-poppins bg-[#F3F6F6] font-medium mx-2.5 text-xtiny text-gray-lite dark:text-[#A6A6A6] justify-center flex flex-col items-center transition-all duration-300 ease-in-out dark:hover:text-white dark:bg-[#212425] hover:text-white   hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476]">
            <Github />
          </span>
        </a>
        <a href="https://www.linkedin.com/in/mirgelys-serrano-b232a4106/">
          <span className="w-full h-10 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out font-poppins bg-[#F3F6F6] font-medium mx-2.5 text-xtiny text-gray-lite dark:text-[#A6A6A6] justify-center flex flex-col items-center transition-all duration-300 ease-in-out dark:hover:text-white dark:bg-[#212425] hover:text-white   hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476]">
            <Telegram />
          </span>
        </a>
      </div>
    </div>
  );
};

export default InfoCard;
