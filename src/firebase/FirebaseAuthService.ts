import { firebaseAuth as auth } from "./config";

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

const subscribeToAuthChanges = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
    } else {
      console.log("no user");
    }
  });
};

export { registerUser, subscribeToAuthChanges, signoutUser, signinUser };
