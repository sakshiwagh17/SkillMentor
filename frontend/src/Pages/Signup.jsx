// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoPersonFill } from "react-icons/go";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return toast.error("All fields are required!");
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(signupInfo),
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Signup successful! Please login.");
        navigate("/login");
      } else {
        toast.error(result.message || "Signup failed");
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
        <h2 className="text-3xl font-semibold text-center mb-3">Create Account</h2>
        <form onSubmit={handleSignup}>
          <div className="flex items-center bg-gray-200 gap-3 rounded-full mb-4 p-2">
            <GoPersonFill />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="outline-none bg-transparent w-full"
              required
              onChange={handleChange}
              value={signupInfo.name}
            />
          </div>
          <div className="flex items-center bg-gray-200 gap-3 rounded-full mb-4 p-2">
            <MdEmail />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="outline-none bg-transparent w-full"
              required
              onChange={handleChange}
              value={signupInfo.email}
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
              value={signupInfo.password}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-blue-600 text-white font-medium"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-gray-400 mt-3 text-center">
          Already have an Account?{" "}
          <span
            className="text-blue-600 cursor-pointer underline"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
