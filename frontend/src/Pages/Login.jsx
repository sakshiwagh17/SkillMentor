// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return toast.error("Email and Password are required!");
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginInfo),
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Login successful!");
        localStorage.setItem("userName", result.user.name);

        localStorage.setItem("userId", result.user.id);

        navigate("/quiz-details");
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="rounded-3xl shadow-lg w-full p-8 sm:w-96 text-sm bg-white">
        <h2 className="text-3xl font-semibold text-center mb-3">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="flex items-center bg-gray-200 gap-3 rounded-full mb-4 p-2">
            <MdEmail />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="outline-none bg-transparent w-full"
              required
              onChange={handleChange}
              value={loginInfo.email}
            />
          </div>
          <div className="flex items-center bg-gray-200 gap-3 rounded-full mb-4 p-2">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="outline-none bg-transparent w-full"
              required
              onChange={handleChange}
              value={loginInfo.password}
            />
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className="cursor-pointer text-indigo-400 mb-2 text-right text-xs"
          >
            Forgot Password?
          </p>
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-blue-600 text-white font-medium"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-gray-400 mt-3 text-center">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
