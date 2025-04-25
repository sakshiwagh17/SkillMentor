import React, { useState, useRef, useEffect } from "react";
import { LuBrain } from "react-icons/lu";
import { Link } from "react-router-dom"; 

const Header = ({ onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userName = localStorage.getItem("userName") || "User";
  const initial = userName.charAt(0).toUpperCase();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className=" bg-gray-900 shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="flex justify-center items-center gap-2">
          <LuBrain className="h-8 w-8 text-blue-500" />
          <h1 className="text-xl font-bold text-blue-500">CollabAI</h1>
        </div>

        {/* Dashboard Link */}
        
      </div>
      <div className="flex justify-center items-center">
      <div>
      <Link
          to="/dashboard"
          className="text-lg m-4 font-semibold text-blue-600 hover:text-blue-600 hover:underline"
        >
          Dashboard
        </Link>
      </div>
      <div className="relative" ref={dropdownRef}>

        <button
          onClick={toggleDropdown}
          className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center"
        >
          {initial}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
            <button
              className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
      </div>
      
    </header>
  );
};

export default Header;
