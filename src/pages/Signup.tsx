import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { registerUser } from "../firebase/FirebaseAuthService";
import {
  createUser,
  UsersCollection,
} from "../firebase/FirebaseFirestoreService";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const Signup: React.FC = () => {
  const [formData, setFormDate] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);

  if (user) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("* Passwords don't match");
      return;
    }

    setPending(true);

    try {
      const newUser = await registerUser(
        formData.email,
        formData.password,
        formData.name
      );

      if (newUser.user !== null) {
        const id = newUser.user.uid;
        const displayName = newUser.user.displayName;
        const email = newUser.user.email;

        await createUser(UsersCollection.USERS, { id, displayName, email });
      }

      setError("");
      setPending(false);
    } catch (error: any) {
      setError(`* ${error.message}`);
      setPending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDate((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      {!loading && (
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full max-w-xs h-3/6 py-6 border-gray-50 rounded"
        >
          <div className="text-center text-2xl mb-3">Welcome</div>
          <div className="mb-3">
            <label className="text-sm">
              Your name
              <input
                type="text"
                className="appearance-none border rounded w-full mt-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green_base"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
          </div>
          {/* <div className="mb-3">
          <label className="text-sm">
            Last name
            <input
              type="text"
              className="appearance-none border rounded w-full mt-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green_base"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
        </div> */}
          <div className="mb-3">
            <label className="text-sm">
              Email
              <input
                type="email"
                className="appearance-none border rounded w-full mt-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green_base"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="text-sm">
              Password
              <input
                type="password"
                className="appearance-none border rounded w-full mt-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green_base"
                name="password"
                value={formData.password}
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="text-sm">
              Confirm Password
              <input
                type="password"
                className="appearance-none border rounded w-full mt-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green_base"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
            {error.length > 0 && (
              <div className="text-sm text-red_base">{error}</div>
            )}
          </div>
          <div className="flex flex-col items-center justify-between">
            <button
              className="bg-green_base hover:bg-green_hover text-white font-bold text-xs py-2 px-8 rounded focus:outline-none focus:shadow-outline mb-3"
              type="submit"
              disabled={pending}
            >
              {!pending ? "Sign Up" : "Pleae Wait"}
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-green_base hover:text-green_hover"
              to="/login"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;
