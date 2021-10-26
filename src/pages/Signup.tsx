import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [formData, setFormDate] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDate((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full max-w-xs h-3/6 py-6 border-gray-50 rounded"
      >
        <div className="text-center text-2xl mb-3">Welcome</div>
        <div className="mb-3">
          <label className="text-sm">
            First name
            <input
              type="text"
              className="appearance-none border rounded w-full mt-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green_base"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
        </div>
        <div className="mb-3">
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
        </div>
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
          {error && (
            <div className="text-sm text-red_base">* Passwords don't match</div>
          )}
        </div>
        <div className="flex flex-col items-center justify-between">
          <button
            className="bg-green_base hover:bg-green_hover text-white font-bold text-xs py-2 px-8 rounded focus:outline-none focus:shadow-outline mb-3"
            type="submit"
          >
            Sign Up
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-green_base hover:text-green_hover"
            to="/login"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
