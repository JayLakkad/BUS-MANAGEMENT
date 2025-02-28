import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import L from "leaflet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import UserDashboard from "@/components/UserDashboard";

const UserHome = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div className="w-full h-screen bg-gray-100 relative overflow-hidden">
      {/* Dropdown Menu */}
      <div className="absolute top-5 right-5 z-[100]">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="w-10 h-10 flex items-center justify-center uppercase rounded-full bg-black text-white font-bold">
              {userData?.user?.fullname?.firstname[0]}
              {userData?.user?.fullname?.lastname[0]}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 w-48 bg-white rounded-lg shadow-md">
            <div className="flex capitalize">
              <h1 className="font-semibold text-lg ml-4">
                {userData?.user?.fullname?.firstname}
              </h1>
              <h1 className="font-semibold text-lg ml-1">
                {userData?.user?.fullname?.lastname}
              </h1>
            </div>
            <DropdownMenuSeparator className="border-t my-2" />
            <DropdownMenuItem
              onClick={() => {
                navigate("/user-logout");
              }}
              className="flex items-center text-gray-600 px-4 py-2 hover:bg-gray-100 hover:text-red-500"
            >
              <h4 className="text-base font-medium">Logout</h4>
              <LogOutIcon className="ml-2 w-4 h-4 text-gray-500" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Map Container */}
      <div id="map" className="w-full h-full">
        <UserDashboard />
      </div>
    </div>
  );
};

export default UserHome;
