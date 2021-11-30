import { firebaseAuth as auth } from "./config";
import { User } from "../state/slices/userSlice";

const registerUser = async (
  email: string,
  password: string,
  displayName: string
) => {
  const res = await auth.createUserWithEmailAndPassword(email, password);
  await res.user?.updateProfile({ displayName });
  return res;
};

const signinUser = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
};

const signoutUser = () => {
  return auth.signOut();
};

const subscribeToAuthChanges = (
  handleAuthChange: (user: User | null) => void
): boolean => {
  let authUser;

  auth.onAuthStateChanged((user) => {
    let stateUser: User | null = null;

    if (user) {
      stateUser = {
        id: user.uid,
        displayName: user.displayName!,
        email: user.email!,
      };
    } else {
    }

    handleAuthChange(stateUser);

    authUser = stateUser;
  });
  if (!authUser) return false;

  return true;
};

const checkLogin = () => {
  const user = auth.currentUser;

  if (user === null) return false;

  return true;
};

export {
  registerUser,
  subscribeToAuthChanges,
  signoutUser,
  signinUser,
  checkLogin,
};
