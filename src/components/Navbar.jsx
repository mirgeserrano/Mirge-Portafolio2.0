import { Link } from "react-router-dom";
import Logo from "../assets/Logo";
import DarkModeToggle from "./DarkModeToogle";
import { BookList, Book, WorkI, User } from "../assets";
const Navbar = () => {


  return (
    <div
      className=" container mx-auto w-full  dark:bg-transparent lg:bg-transparent lg:dark:b0g-transparent flex justify-between py-5 lg:px-0 lg:pt-[50px] aos-init aos-animate "
      data-aos="fade"
    >
      <div className="w-full flex justify-between px-4">
        <Logo />
        <div className="flex items-center " id="navbar-default">
          <DarkModeToggle />
       
        <button data-collapse-toggle="navbar-default" type="button" className="lg:hidden   bg-[#ef4060] w-[40px] h-[40px] rounded-full flex justify-center items-center text-white dark:text-white text-3xl ml-3 " aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className=" block lg:hidden" id="navbar-default">
      <ul className="block  rounded-b-[20px] shadow-md absolute left-0 top-20 z-[22222222222222] w-full bg-white dark:bg-[#1d1d1d]">
        <li>
          <Link href="#" className="pl-4 cursor-pointer transition-colors duration-300 ease-in-out font-poppins text-xs text-gray-lite font-medium  flex text-xtiny py-2.5 md:px-4 xl:px-5 items-center dark:text-white dark:hover:text-[#FA5252]   hover:text-[#FA5252] " aria-current="page"><User/> Sobre Mi </Link>
        </li>
        <li>
          <Link href="#" className="pl-4 cursor-pointer  transition-colors duration-300 ease-in-out  font-poppins  text-xs text-gray-lite font-medium   flex text-xtiny py-2.5 md:px-4 xl:px-5 items-center   dark:text-white dark:hover:text-[#FA5252] hover:text-[#FA5252]"><BookList/> Resumen</Link>
        </li>
        <li>
          <Link href="#" className="pl-4 cursor-pointer  transition-colors duration-300 ease-in-out  font-poppins   text-xs text-gray-lite font-medium   flex text-xtiny py-2.5 md:px-4 xl:px-5 items-center   dark:text-white dark:hover:text-[#FA5252] hover:text-[#FA5252]"><WorkI/> Trabajos</Link>
        </li>
        <li>
          <Link href="#" className="pl-4 cursor-pointer  transition-colors duration-300 ease-in-out  font-poppins  text-xs text-gray-lite font-medium   flex text-xtiny py-2.5 md:px-4 xl:px-5 items-center   dark:text-white dark:hover:text-[#FA5252] hover:text-[#FA5252]"> <Book/> Contactamé</Link>
        </li>
      </ul>
    </div>
    </div>
      </div>
    </div>
  );
};

export default Navbar;
