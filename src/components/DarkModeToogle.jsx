// DarkModeToggle.js
import { useEffect, useState } from "react";
import Mom from "../assets/Mom";
import Sun from "../assets/Sun";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "enabled"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "enabled");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "disabled");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="bg-white dark:bg-[#4D4D4D] w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full flex justify-center items-center hover:bg-[#ef4060] transition-all duration-300 ease-in-out cursor-pointer  "
    >
      {darkMode ? <Sun /> : <Mom />}
    </button>
  );
};

export default DarkModeToggle;
