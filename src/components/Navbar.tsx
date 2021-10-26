import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-12 flex items-center justify-center fixed">
      <ul className="w-full flex justify-between items-center max-w-5xl">
        <li className="">
          <Link to="/">
            <i className="fas fa-wave-square text-white hover:text-green_base text-3xl"></i>
          </Link>
        </li>
        <li className="">
          <input
            type="text"
            className="border rounded  py-2 px-3 w-96 leading-tight bg-transparent text-white focus:outline-none focus:shadow-outline focus:border-green_base"
          />
        </li>
        <li className="text-white cursor-pointer">
          <div className="">Account</div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
