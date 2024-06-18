import { useDispatch } from "react-redux";
import {
  Dashboard,
  Facuracion,
  Inbox,
  InboxArrowDown,
  SideBarBurger,
  SignIn,
  User,
  Users,
} from "../assets";

import { Link } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import { useEffect, useRef, useState } from "react";
export const SideBar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const startLogout = useAuthStore();
  const dispatch = useDispatch();

  const signIn = () => {
    localStorage.clear();
    dispatch(startLogout());
  };

  const menuItems = [
    { title: "Home", path: "/home" },
    { title: "Facturacion", path: "/invoice" },
    { title: "Clientes", path: "/customer" },
    { title: "Productos", path: "/product" },
    { title: "Servicios", path: "/services" },
    { title: "Cuenta por Cobrar", path: "/cxc" },
    { title: "Salir ", path: "/", specialFunction: signIn },
  ];

  const selectMenuItemp = (index) => {
    setSelectedMenuItem(index);
    return setSelectedMenuItem(index);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full ">
        <button
          onClick={toggleSidebar}
          data-drawer-target="sidebar-multi-level-sidebar"
          data-drawer-toggle="sidebar-multi-level-sidebar"
          aria-controls="sidebar-multi-level-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <SideBarBurger />
        </button>

        <aside
          ref={sidebarRef}
          id="sidebar-multi-level-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full" // Aplicar clase para mostrar/ocultar el menú según el estado
          } sm:translate-x-0`}
          //className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full mt-20 px-3 py-2 overflow-y-auto bg-gray-200 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    onClick={() => {
                      if (item.specialFunction) {
                        item.specialFunction();
                      }
                      selectMenuItemp(index);
                    }}
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-[#D0D3F4] dark:hover:bg-gray-700 group ${
                      selectedMenuItem == index ? "bg-[#A1A7E8]" : ""
                    }`}
                    to={item.path}
                    value={item.title}
                  >
                    {item.title === "Home" && <Dashboard />}
                    {item.title === "Facturacion" && <Facuracion />}
                    {item.title === "Clientes" && <User/>}
                    {item.title === "Productos" && <Inbox />}
                    {item.title === "Servicios" && <Users />}
                    {item.title === "Cuenta por Cobrar" && <InboxArrowDown />}
                    {item.title === "Salir " && <SignIn />}
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </nav>
    </div>
  );
};
