import React, { useEffect, useRef, useCallback } from "react";
import { toggleTheme } from "../hook/useDarkMode";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { signoutUser } from "../firebase/FirebaseAuthService";
import { Link } from "react-router-dom";

interface Props {
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown: React.FC<Props> = ({ setDropdownOpen }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = useCallback(
    (e: any) => {
      if (!ref.current) return;

      if (ref.current.contains(e.target)) {
        // inside click
        return;
      }
      // outside click
      setDropdownOpen(false);
    },
    [setDropdownOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const handleClick = () => {
    if (user) {
      signoutUser();
      setDropdownOpen(false);
    }
  };

  return (
    <div
      ref={ref}
      className="absolute right-0 top-8 pt-4 rounded-md w-auto border border-gray-200 bg-white dark:border-gray-500 dark:bg-gray-800 flex justify-center items-center flex-col"
    >
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

      {user && (
        <>
          <div className="mx-3 font-bold mb-3 dark:text-white max-w-xs text-center">
            {user.displayName}
          </div>
          <Link
            to="/portfolio"
            className="w-full text-center cursor-pointer hover:bg-gray-200 py-3 dark:text-white dark:hover:bg-gray-700"
            onClick={() => setDropdownOpen(false)}
          >
            Portfolio
          </Link>
          <Link
            to="/history"
            className="w-full text-center cursor-pointer hover:bg-gray-200 py-3 dark:text-white dark:hover:bg-gray-700"
            onClick={() => setDropdownOpen(false)}
          >
            History
          </Link>
        </>
      )}

      <div className="h-px w-full bg-gray-200 dark:bg-gray-500" />

      <Link
        to={user ? "/" : "/login"}
        className="w-full text-center cursor-pointer hover:bg-gray-200 py-3 dark:text-white dark:hover:bg-gray-700"
        onClick={handleClick}
      >
        {user ? "Logout" : "Log In"}
      </Link>
    </div>
  );
};

export default Dropdown;
