import { firebaseAuth as auth } from "./config";

const registerUser = (email: string, password: string) => {
  console.log("register user");
  return auth.createUserWithEmailAndPassword(email, password);
};

const subscribeToAuthChanges = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user.email);
    } else {
      console.log("no user");
    }
  });
};

export { registerUser, subscribeToAuthChanges };
