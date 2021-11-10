import React, { useState, useEffect, useRef } from "react";
import { toggleTheme } from "../hook/useDarkMode";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { signoutUser } from "../firebase/FirebaseAuthService";

const Dropdown: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return <div className=""></div>;
};

export default Dropdown;
