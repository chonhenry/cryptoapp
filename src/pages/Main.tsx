import React from "react";
import { signoutUser } from "../firebase/FirebaseAuthService";

const Main = () => {
  return (
    <div className="max-w-5xl mt-6 m-auto flex justify-between">
      <button onClick={signoutUser}>signout</button>
    </div>
  );
};

export default Main;
