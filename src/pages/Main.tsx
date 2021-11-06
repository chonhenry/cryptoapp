import React from "react";
import { signoutUser } from "../firebase/FirebaseAuthService";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { add } from "../state/slices/userSlice";

const Main = () => {
  const user = useSelector((state: RootState) => state.user.value);

  // const dispatch = useDispatch();

  const handleClick = () => {
    // dispatch(add(1));
  };

  return (
    <div className="max-w-5xl mt-6 m-auto flex justify-between">
      <div>
        <button onClick={signoutUser}>signout</button>
        <br />
        <br />
        <br />
        <div onClick={handleClick} className="bg-pink-300 w-full">
          {/* {user.length === 0 ? "empty" : user[user.length - 1]} */}
        </div>
      </div>
    </div>
  );
};

export default Main;
