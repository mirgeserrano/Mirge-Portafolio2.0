import Logo from "../assets/Logo";
import DarkModeToggle from "./DarkModeToogle";

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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
