import React, { useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DriverDashboard from "@/components/DriverDashboard";

const DriverHome = () => {

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [driverData, setDriverData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/driver/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setDriverData(response.data);
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
      <div className="absolute top-4 right-4 z-[100]">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-bold uppercase">
              {driverData?.driver?.fullname?.firstname[0]}
              {driverData?.driver?.fullname?.lastname[0]}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 w-48 bg-white rounded-lg shadow-md">
            <h1 className="font-semibold text-lg ml-4 capitalize">{driverData?.driver?.fullname.firstname} {driverData?.driver?.fullname.lastname}</h1>
            <DropdownMenuSeparator className="border-t my-2" />
            <DropdownMenuItem
              onClick={() => {
                navigate("/driver-logout");
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
        <DriverDashboard />
      </div>
    </div>
  );
};

export default DriverHome;
