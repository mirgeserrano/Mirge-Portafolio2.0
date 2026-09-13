import { Link } from "react-router-dom";
import Logo from "../../assets/Logo";
import DarkModeToggle from "./DarkModeToggle";
import { BookList, Book, WorkI, User, Xmark, BurgerMenu } from "../../assets";
import { useState } from "react";
import { navigationItems } from "../../content/siteContent";

const iconMap = {
  about: User,
  resume: BookList,
  work: WorkI,
  contact: Book,
};

const Navbar = () => {
  const [hidden, sethidden] = useState(false);

  const toggleMenu = () => {
    sethidden(!hidden);
  };

  return (
    <div
      className="container mx-auto w-full  dark:bg-transparent lg:bg-transparent lg:dark:b0g-transparent flex justify-between py-5 lg:px-0 lg:pt-[50px] aos-init aos-animate z-50 "
      data-aos="fade"
    >
      <div className="w-full flex justify-between px-4">
        <Logo />
        <div className="flex items-center " id="navbar-default">
          <DarkModeToggle />

          <button
            onClick={toggleMenu}
            data-collapse-toggle="navbar-default"
            type="button"
            className="lg:hidden   bg-[#ef4060] w-[40px] h-[40px] rounded-full flex justify-center items-center text-white dark:text-white text-3xl ml-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef4060]"
            aria-controls="navbar-default"
            aria-expanded={hidden}
            aria-label={hidden ? "Cerrar menú principal" : "Abrir menú principal"}
          >
            <span className="sr-only">{hidden ? "Cerrar menú principal" : "Abrir menú principal"}</span>
            {hidden ? <Xmark /> : <BurgerMenu />}
          </button>
          <div
            className={`${hidden ? "block lg:hidden" : "hidden  "}`}
            id="navbar-default"
          >
            <ul className="block  rounded-b-[20px] shadow-md absolute left-0 top-20 z-[22222222222222] w-full bg-white dark:bg-[#1d1d1d]">
              {navigationItems.map(({ path, label, icon }) => {
                const Icon = iconMap[icon];

                return (
                  <li key={path}>
                    <Link
                      to={path}
                      className="cursor-pointer transition-colors duration-300 ease-in-out font-poppins text-xs text-gray-lite font-medium flex text-xtiny py-2.5 md:px-4 xl:px-5 items-center dark:text-white dark:hover:text-[#FA5252] hover:text-[#FA5252] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FA5252]"
                      aria-current={window.location.pathname === path || (path === "/work" && window.location.pathname.startsWith("/work")) ? "page" : undefined}
                    >
                      <div className="px-2">
                        <Icon />
                      </div>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
