import { useDispatch } from "react-redux";
import {
  Dashboard,
  Facuracion,
  Product,
  SideBarBurger,
  SignIn,
} from "../assets";

import { Link } from "react-router-dom";
import useAuthStore from "../hooks/useAuthStore";
import { useEffect, useRef, useState } from "react";
import Users from "../assets/Users";

export const SideBar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const startLogout = useAuthStore();
  const dispatch = useDispatch();
  
  const signIn = () => {
    dispatch(startLogout());
    localStorage.clear();
  };

  const menuItems = [
    { title: "Home", path: "/notFound" },
    { title: "Facturacion", path: "/invoice" },
    { title: "Productos", path: "/product" },
    { title: "Servicios", path: "/services" },
    { title: "Sign In", path: "/", specialFunction: signIn },
  ];

  const selectMenuItem = (index) => {
    setSelectedMenuItem(index);
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
      <nav className="fixed top-0 left-0 w-full bg-white">
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
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group ${
                      selectedMenuItem === index ? "bg-gray-300" : ""
                    }`}
                    onClick={() => {
                      if (item.specialFunction) {
                        item.specialFunction();
                      }
                      selectMenuItem(index);
                    }}
                    to={item.path}
                    value={item.title}
                  >
                    {item.title === "Home" && <Dashboard />}
                    {item.title === "Facturacion" && <Facuracion />}
                    {item.title === "Productos" && <Product />}
                    {item.title === "Servicios" && <Users />}
                    {item.title === "Sign In" && <SignIn />}
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
