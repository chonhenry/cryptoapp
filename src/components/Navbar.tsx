import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toggleTheme } from "../hook/useDarkMode";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="w-full h-16 flex items-center justify-center sticky top-0">
      <ul className="w-full flex justify-between items-center max-w-5xl relative">
        <li className="text-">
          <Link to="/">
            <i
              className="fas fa-wave-square text-black dark:text-white
             hover:text-green_base dark:hover:text-green_base text-3xl"
            ></i>
          </Link>
        </li>
        <li className="">
          <input
            type="text"
            className="border rounded py-2 px-3 w-96 leading-tight bg-transparent text-black dark:text-white focus:outline-none focus:shadow-outline focus:border-green_base"
          />
        </li>
        <li
          className="cursor-pointer font-mono"
          onClick={() => {
            setDropdownOpen((prev) => !prev);
          }}
        >
          <div className="text-black dark:hover:text-green_base dark:text-white">
            Account
          </div>
        </li>

        {dropdownOpen && (
          <div className="absolute right-0 top-8 py-4 rounded-md w-32 border border-gray-200 bg-white dark:border-gray-500 dark:bg-gray-800 flex justify-center">
            <div className="">
              <button
                className=" w-10 h-10 rounded-tl-md rounded-bl-md bg-opacity-10 text-green_base border border-green_base bg-green_base dark:text-white"
                onClick={() => toggleTheme("light")}
              >
                <i className="far fa-sun"></i>
              </button>
              <button
                className=" w-10 h-10 rounded-tr-md rounded-br-md bg-opacity-10 text-green_base border border-green_base bg-green_base dark:text-white"
                onClick={() => toggleTheme("dark")}
              >
                <i className="far fa-moon"></i>
              </button>
            </div>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

/* <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className="dark:bg-gray-500"
      >
        <div className="flex justify-center items-center m-5">
          <button className=" w-28 h-8 rounded-tl-md rounded-bl-md bg-opacity-10 text-green_base border border-green_base bg-green_base dark:text-white">
            <i className="far fa-sun mr-2 "></i>Light
          </button>
          <button
            className="bg-gray-300 w-28 h-8 rounded-tr-md rounded-br-md"
            onClick={toggleTheme}
          >
            <i className="far fa-moon mr-2"></i>Dark
          </button>
        </div>
      </Drawer> */
