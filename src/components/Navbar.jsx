import logo from "../assets/images/logoImage.jpg";
import avatar from "../assets/images/avatar2.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav className=" dark:bg-gray-900 fixed top-0 z-50 w-full ">
      <div className="flex flex-rows items-center bg-white border-gray-900 justify-between mx-auto p-4 shadow-md rounded-xl ">
        <div className="flex items-center">
          <img src={logo} alt="Mi imagen" className="w-14 h-12 mr-2" />
          <p className="self-center text-[#1323C6] text-2xl font-semibold dark:text-white">
             FactuPro
          </p>
        </div>
        <div className="flex items-center " id="navbar-default">    
          <p className="font-semibold">
            {user.firstname} {user.lastname}
          </p>
          <img className="w-12 h-12 " src={avatar} alt="user photo" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
