import { LogOut } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const WhoIsLogging = () => {
  return (
    <div className="w-full h-screen relative">
      <Link
        to="/"
        className="absolute w-10 h-10 top-5 right-5 rounded-full flex justify-center items-center bg-black text-white py-3 text-lg sm:text-xl hover:bg-white hover:text-black hover:scale-90 transition duration-300 z-[999]"
      >
        <LogOut />
      </Link>
      <div className="relative h-screen w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1632276536839-84cad7fd03b0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center text-gray-900 font-sans px-5 sm:px-10 md:px-20 lg:px-40">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Content */}
        <div className="relative z-10 text-center p-8 bg-white/10 backdrop-blur-md w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-[f2] font-bold mb-8 text-white">
            Identify Yourself
          </h1>

          {/* Selection Buttons */}
          <div className="space-y-6 w-full">
            <Link
              className="block w-full py-4 bg-white font-[f2] text-blue-600 text-lg md:text-xl font-medium text-center shadow-md hover:bg-blue-700 hover:text-white transition duration-300"
              to="/user-login"
            >
              Student/Staff
            </Link>
            <Link
              className="block w-full py-4 bg-white font-[f2] text-green-600 text-lg md:text-xl font-medium text-center shadow-md hover:bg-green-700 hover:text-white transition duration-300"
              to="/driver-login"
            >
              Driver
            </Link>
            <Link
              className="block w-full py-4 bg-white font-[f2] text-red-600 text-lg md:text-xl font-medium text-center shadow-md hover:bg-red-700 hover:text-white transition duration-300"
              to="/admin-login"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoIsLogging;
