import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-red_base h-12 flex items-center fixed">
      <ul className="w-full flex justify-between items-center px-6">
        <li className="">
          <i className="fas fa-wave-square text-green_base text-3xl"></i>
        </li>
        <li className="">
          <input type="text" />
        </li>
        <li className="">
          <div className="">Account</div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
