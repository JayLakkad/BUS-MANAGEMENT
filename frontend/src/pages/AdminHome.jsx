import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Header */}
      <header className="py-6 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold tracking-wide">Admin Dashboard</h1>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-black font-bold cursor-pointer hover:bg-gray-300 transition duration-200">
                AD
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="p-4">
                <h1 className="text-lg font-semibold text-gray-800">Admin</h1>
              </div>
              <DropdownMenuSeparator className="border-t border-gray-200" />
              <DropdownMenuItem
                onClick={() => {
                  navigate("/admin-logout");
                }}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-red-500 cursor-pointer transition duration-200"
              >
                <LogOutIcon className="w-5 h-5" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-12 text-center">
          Create Account
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Card for Student/Staff */}
          <Link
            to="/create-student-id"
            className="group bg-gray-100 border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center hover:border-black hover:bg-gray-200 transition duration-200"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-300 text-xl font-extrabold text-black mb-4 group-hover:bg-gray-400 transition duration-200">
              SS
            </div>
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-black">
              Student/Staff
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Create and manage accounts for students and staff members.
            </p>
          </Link>

          {/* Card for Driver */}
          <Link
            to="/create-driver-id"
            className="group bg-gray-100 border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center hover:border-black hover:bg-gray-200 transition duration-200"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-300 text-xl font-extrabold text-black mb-4 group-hover:bg-gray-400 transition duration-200">
              DV
            </div>
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-black">
              Driver
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Generate unique accounts for bus drivers.
            </p>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-200">
        <p className="text-center text-sm text-gray-500">
          &copy; 2023 Bus Management System. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AdminHome;
