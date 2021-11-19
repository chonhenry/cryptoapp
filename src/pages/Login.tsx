import React, { useState } from "react";
import { signinUser } from "../firebase/FirebaseAuthService";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const Login: React.FC = () => {
  const [formData, setFormDate] = useState({ email: "", password: "" });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);

  if (user) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    try {
      await signinUser(formData.email, formData.password);
      setError(false);
      setPending(false);
    } catch (error: any) {
      setPending(false);
      setError(true);
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
          className="w-full max-w-xs h-3/6 border-gray-50 rounded"
        >
          <div className="text-center text-2xl mb-3">Welcome</div>
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
            {error && (
              <div className="text-sm text-red_base">Signin failed</div>
            )}
          </div>
          <div className="flex flex-col items-center justify-between">
            <button
              className="bg-green_base hover:bg-green_hover text-white font-bold text-xs py-2 px-8 rounded focus:outline-none focus:shadow-outline mb-3"
              type="submit"
            >
              {!pending ? "Sign In" : "Loading..."}
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-green_base hover:text-green_hover"
              to="/signup"
            >
              Don't have an account?
            </Link>
            <button
              className="bg-green_hover text-white font-bold text-xs py-2 px-8 mt-8 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Demo Sign In
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
