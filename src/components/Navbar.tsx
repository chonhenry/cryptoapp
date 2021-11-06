import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toggleTheme } from "../hook/useDarkMode";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { signoutUser } from "../firebase/FirebaseAuthService";

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => {
    if (user) {
      signoutUser();
      setDropdownOpen(false);
    }
  };

  return (
    <nav className="w-full h-16 flex items-center justify-center sticky top-0 bg-white dark:bg-black">
      <ul className="w-full flex justify-center items-center max-w-5xl relative mx-7">
        <li className="mr-auto">
          <Link to="/">
            <i
              className="fas fa-wave-square text-black dark:text-white
             hover:text-green_base dark:hover:text-green_base text-3xl"
            ></i>
          </Link>
        </li>

        <li className=" w-8/12 mx-3 md:w-96 md:mx-0">
          <input
            type="text"
            className="border rounded py-2 px-3 w-full leading-tight bg-transparent text-black dark:text-white focus:outline-none focus:shadow-outline focus:border-green_base"
          />
        </li>

        <li
          className="cursor-pointer font-mono ml-auto"
          onClick={() => {
            setDropdownOpen((prev) => !prev);
          }}
        >
          <div className="text-black dark:hover:text-green_base dark:text-white">
            Account
          </div>
        </li>

        {dropdownOpen && (
          <div className="absolute right-0 top-8 pt-4 rounded-md w-auto border border-gray-200 bg-white dark:border-gray-500 dark:bg-gray-800 flex justify-center items-center flex-col">
            <div className="mb-3 px-4">
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

            <div className="mx-3 font-bold mb-3 dark:text-white max-w-xs text-center">
              {user && user.displayName}
            </div>

            <div className="h-px w-full bg-gray-200 dark:bg-gray-500" />

            <Link
              to={user ? "/" : "/login"}
              className="w-full text-center cursor-pointer hover:bg-gray-200 py-3 dark:text-white dark:hover:bg-gray-700"
              onClick={handleClick}
            >
              {user ? "Logout" : "Log In"}
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
