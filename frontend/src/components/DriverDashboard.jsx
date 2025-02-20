import React, { useState, useEffect } from "react";
import socket from "./socket";
import MapView from "./MapView";

const DriverDashboard = () => {
  const [routeName, setRouteName] = useState("");
  const [isTripStarted, setIsTripStarted] = useState(false);

  const startTrip = () => {
    if (!routeName) {
      console.error("Route name is not set.");
      return;
    }
    socket.emit("start-trip", { driverId: "driver123", routeName });
    setIsTripStarted(true);
    console.log("Trip started on route:", routeName);
    updateLocation(); // Send location immediately after starting the trip
  };

  const updateLocation = () => {
    if (!routeName) {
      console.error("Route name is not set.");
      return;
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          socket.emit("update-location", { // Changed from "bus-location" to "update-location"
            driverId: "driver123",
            routeName,
            latitude,
            longitude,
          });
          console.log("Driver's location sent:", { latitude, longitude,routeName });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    let interval = null;
    if (isTripStarted) {
      updateLocation(); // Send location immediately after starting the trip
      interval = setInterval(updateLocation, 1500); // Send location every 1.5 seconds
    }
    return () => {
      if (interval) clearInterval(interval); // Cleanup interval
    };
  }, [isTripStarted]);

  return (
    <div>
      <div className="w-full h-screen flex justify-center items-end">
        <div className="z-[100] mb-10 bg-white shadow-lg rounded-2xl p-6 space-y-4 max-w-sm">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Driver Dashboard
          </h2>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setRouteName(e.target.value)}
            value={routeName}
          >
            <option value="">Select Route</option>
            <option value="Route1">Route 1</option>
            <option value="Route2">Route 2</option>
            <option value="Route3">Route 3</option>
          </select>
          <button
            className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition ${
              routeName
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            onClick={startTrip}
            disabled={!routeName}
          >
            {isTripStarted ? "Trip In Progress" : "Start Trip"}
          </button>
        </div>
      </div>
      <MapView />
    </div>
  );
};

export default DriverDashboard;