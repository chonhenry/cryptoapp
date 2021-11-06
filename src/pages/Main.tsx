import React from "react";
import { signoutUser } from "../firebase/FirebaseAuthService";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const Main = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);

  return (
    <div className="max-w-5xl mt-6 m-auto flex justify-between">
      <div>
        <button onClick={signoutUser}>signout</button>
        <br />
        <br />
        <br />
        <div className="bg-pink-300 w-full">
          {loading ? "loading..." : user ? user.displayName : "no user"}
        </div>
      </div>
    </div>
  );
};

export default Main;
