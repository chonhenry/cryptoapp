import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormDate] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDate((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full max-w-xs h-3/6 py-6 border-gray-50 rounded"
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
        </div>
        <div className="flex flex-col items-center justify-between">
          <button
            className="bg-green_base hover:bg-green_hover text-white font-bold text-xs py-2 px-8 rounded focus:outline-none focus:shadow-outline mb-3"
            type="submit"
          >
            Sign In
          </button>
          <Link
            className="inline-block align-baseline font-bold text-sm text-green_base hover:text-green_hover"
            to=""
          >
            Don't have an account?
          </Link>
        </div>
      </form>
      <div className="text-center">
        <button
          className="bg-green_hover text-white font-bold text-xs py-2 px-8 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Demo Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
