import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/user-login");
      }
    });

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="p-8 bg-white rounded-2xl flex items-center space-x-4">
        <svg
          className="animate-spin h-8 w-8 text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <h2 className="text-lg font-medium text-gray-700">
          Logging out, please wait...
        </h2>
      </div>
    </div>
  );
};

export default UserLogout;
