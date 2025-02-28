import React from "react";
import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <div className="w-screen h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 text-gray-900">
      {/* Left Side - Video with Overlay Text */}
      <div className="relative w-full md:w-1/2 h-full flex items-center justify-center">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1527058918112-6e17a8213943?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Bus Management"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            Bus Management System
          </h1>
        </div>
      </div>

      {/* Right Side - Information & Continue Button */}
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center text-center p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Seamless Bus Operations</h2>
        <p className="text-lg md:text-xl max-w-md mb-8">
          Track buses, manage schedules, ensure smooth transit.
        </p>
        <Link
          to="/who-is-login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-medium transition duration-300 max-w-full"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
