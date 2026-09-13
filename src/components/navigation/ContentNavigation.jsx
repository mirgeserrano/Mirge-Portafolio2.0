import { NavLink } from "react-router-dom";
import { BookList, Book, WorkI, User } from "../../assets";
import Footer from "./Footer";

const navigationItems = [
  { path: "/about", label: "Sobre Mi", Icon: User },
  { path: "/resume", label: "Resumen", Icon: BookList },
  { path: "/work", label: "Trabajos", Icon: WorkI },
  { path: "/contact", label: "Contactame", Icon: Book },
];

const ContentNavigation = ({ children }) => {
  return (
    <div className="content-column col-span-12 lg:col-span-8 flex flex-col">
      <header className="content-nav h-[144px] hidden lg:block p-[30px] ml-auto mb-10 rounded-[16px] bg-white dark:bg-[#111111]">
        <nav className="hidden lg:block">
          <ul className="flex">
            {navigationItems.map(({ path, label, Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `w-full h-20 rounded-[10px] cursor-pointer transition-all duration-300 ease-in-out font-poppins bg-[#F3F6F6] font-medium mx-2.5 text-xtiny text-gray-lite dark:text-[#A6A6A6] justify-center flex flex-col items-center dark:hover:text-white dark:bg-[#212425] hover:text-white ${isActive ? "text-white bg-gradient-to-r from-[#FA5252] to-[#DD2476] dark:text-white" : ""}`}
                data-aos="fade-right"
              >
                <Icon />
                {label}
              </NavLink>
            ))}
          </ul>
        </nav>
      </header>

      <section className="bg-white rounded-t-2xl flex-1 dark:bg-[#111111]">
        <div className="aos-init aos-animate">
          {children}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContentNavigation;
