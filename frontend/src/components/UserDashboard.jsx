import React, { useState, useEffect } from "react";
import socket from "./socket";
import MapView from "./MapView";

const UserDashboard = () => {
  const [stopName, setStopName] = useState("");
  const [driverLocation, setDriverLocation] = useState(null);

  const joinRoute = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (stopName) {
      socket.emit("join-route", { studentId: "student456", stopName });
      console.log("Joined route at stop:", stopName);
      setStopName("");
    }
  };

  useEffect(() => {
    // Listen for updates to the driver's location
    socket.on("update-location", (location) => {
      setDriverLocation(location); // Update state with the driver's location
      console.log("Driver location received:", location);
    });

    return () => {
      // Clean up the socket listener when the component unmounts
      socket.off("update-location");
    };
  }, []);

  return (
    <div>
      <div className="w-full h-screen flex justify-center items-end">
        <div className="mb-10 z-50 bg-white shadow-lg rounded-2xl p-4 space-y-4 max-w-sm">
          <h2 className="text-xl font-semibold text-gray-800">Enter Route</h2>
          <form onSubmit={joinRoute} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your stop name"
              value={stopName}
              onChange={(e) => setStopName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className={`w-full py-2 px-4 text-white font-semibold rounded-lg ${
                stopName
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!stopName}
            >
              Join Route
            </button>
          </form>
        </div>
      </div>
      {/* Pass driver's location to MapView */}
      <MapView driverLocation={driverLocation} />
    </div>
  );
};

export default UserDashboard;
