import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookList, Book, WorkI, User } from "../../assets";
import { About, Contact, Resume, Work } from ".";
import Aos from "aos";
import Footer from "./Footer";

const NavbarBox = () => {
  const [activeSection, setActiveSection] = useState("about");
  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <div className="col-span-12 lg:col-span-8  ">
      <header className="lg:w-[526px] h-[144px] hidden lg:block  p-[30px] ml-auto mb-10  rounded-[16px] bg-white dark:bg-[#111111] ">
        <nav className="hidden lg:block">
          <ul className="flex">
            <Link
              onClick={() => setActiveSection("about")}
              className={`w-full h-20 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out font-poppins bg-[#F3F6F6] font-medium mx-2.5 text-xtiny text-gray-lite dark:text-[#A6A6A6] justify-center flex flex-col items-center transition-all duration-300 ease-in-out dark:hover:text-white dark:bg-[#212425] hover:text-white  ${
                activeSection === "about"
                  ? "text-white bg-gradient-to-r from-[#FA5252] to-[#DD2476] dark:text-white"
                  : ""
              } hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476]`}
              data-aos="fade-right"
            >
              <User />
              Sobre Mi
            </Link>

            <Link
              onClick={() => setActiveSection("resume")}
              className={`w-full h-20 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out font-poppins bg-[#F3F6F6] font-medium mx-2.5 text-xtiny text-gray-lite dark:text-[#A6A6A6] justify-center flex flex-col items-center transition-all duration-300 ease-in-out dark:hover:text-white dark:bg-[#212425] hover:text-white  ${
                activeSection === "resume"
                  ? "text-white bg-gradient-to-r from-[#FA5252] to-[#DD2476] dark:text-white"
                  : ""
              } hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476]`}
              data-aos="fade-right"
            >
              <BookList />
              Resumen
            </Link>

            <Link
              onClick={() => setActiveSection("work")}
              className={`w-full h-20 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out font-poppins bg-[#F3F6F6] font-medium mx-2.5 text-xtiny text-gray-lite dark:text-[#A6A6A6] justify-center flex flex-col items-center transition-all duration-300 ease-in-out dark:hover:text-white dark:bg-[#212425] hover:text-white  ${
                activeSection === "work"
                  ? "text-white bg-gradient-to-r from-[#FA5252] to-[#DD2476] dark:text-white"
                  : ""
              } hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476]`}
              data-aos="fade-right"
            >
              <WorkI />
              Trabajos
            </Link>

            <Link
              onClick={() => setActiveSection("contact")}
              className={`w-full h-20 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out font-poppins bg-[#F3F6F6] font-medium mx-2.5 text-xtiny text-gray-lite dark:text-[#A6A6A6] justify-center flex flex-col items-center transition-all duration-300 ease-in-out dark:hover:text-white dark:bg-[#212425] hover:text-white  ${
                activeSection === "contact"
                  ? "text-white bg-gradient-to-r from-[#FA5252] to-[#DD2476] dark:text-white"
                  : ""
              } hover:bg-gradient-to-r from-[#FA5252] to-[#DD2476] `}
              data-aos="fade-right"
            >
              <Book />
              Contactame
            </Link>
          </ul>
        </nav>
      </header>

      <section className="bg-white rounded-t-2xl  dark:bg-[#111111]">
        <div className="aos-init aos-animate">
          {activeSection === "about" && <About />}
          {activeSection === "resume" && <Resume />}
          {activeSection === "work" && <Work />}
          {activeSection === "contact" && <Contact />}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NavbarBox;
