import { firebaseAuth as auth } from "./config";
import { User } from "../state/slices/userSlice";

const registerUser = async (
  email: string,
  password: string,
  displayName: string
) => {
  //   console.log("register user");
  const res = await auth.createUserWithEmailAndPassword(email, password);
  await res.user?.updateProfile({ displayName });
  return res;
};

const signinUser = (email: string, password: string) => {
  //   console.log("signin user");
  return auth.signInWithEmailAndPassword(email, password);
};

const signoutUser = () => {
  //   console.log("logoutUser");
  return auth.signOut();
};

const subscribeToAuthChanges = (
  handleAuthChange: (user: User | null) => void
) => {
  auth.onAuthStateChanged((user) => {
    // console.log("onAuthStateChanged");
    let stateUser: User | null = null;

    if (user) {
      console.log("user:", user);
      stateUser = {
        id: user.uid,
        displayName: user.displayName!,
        email: user.email!,
      };
    } else {
      console.log("user:", null);
    }

    handleAuthChange(stateUser);
  });
};

export { registerUser, subscribeToAuthChanges, signoutUser, signinUser };
