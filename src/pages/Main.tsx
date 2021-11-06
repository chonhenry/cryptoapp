import React from "react";
import { signoutUser } from "../firebase/FirebaseAuthService";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
// import { add } from "../state/slices/userSlice";

const Main = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="max-w-5xl mt-6 m-auto flex justify-between">
      <div>
        <button onClick={signoutUser}>signout</button>
        <br />
        <br />
        <br />
        <div className="bg-pink-300 w-full">
          {user ? user.displayName : "no user"}
        </div>
      </div>
    </div>
  );
};

export default Main;
