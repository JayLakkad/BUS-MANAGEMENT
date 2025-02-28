import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { LogOut } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const adminData = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/login`,
        adminData
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        toast.success("Login successful!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate("/admin-home");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full h-screen relative">
      <Link
        to="/who-is-login"
        className="absolute w-10 h-10 top-5 right-5 rounded-full flex justify-center items-center bg-black text-white py-3 text-lg sm:text-xl hover:bg-white hover:text-black hover:scale-90 transition duration-300 z-[999]"
      >
        <LogOut />
      </Link>

      <div className="w-full h-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1632276536839-84cad7fd03b0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center px-4 sm:px-6">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Glassmorphism Login Form */}
        <div className="relative z-10 w-full max-w-[400px] p-6 sm:p-8 bg-white/10 backdrop-blur-md">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl text-white font-semibold font-[f2] text-center mb-6">
            Admin Login
          </h1>

          {/* Login Form */}
          <form onSubmit={submitHandler} className="flex flex-col gap-6">
            <div className="flex items-center border-b border-white/50 py-2">
              <i className="ri-user-3-line text-white text-lg sm:text-xl mr-3"></i>
              <input
                className="bg-transparent w-full text-white font-[f1] placeholder-gray-300 px-2 py-2 outline-none text-base sm:text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
            </div>

            <div className="flex items-center border-b border-white/50 py-2">
              <i className="ri-lock-unlock-line text-white text-lg sm:text-xl mr-3"></i>
              <input
                className="bg-transparent w-full text-white font-[f1] placeholder-gray-300 px-2 py-2 outline-none text-base sm:text-lg"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            <button
              className="w-full bg-black text-white font-[f1] py-3 text-lg sm:text-xl hover:bg-white hover:text-black hover:scale-90 transition duration-300"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminLogin;
