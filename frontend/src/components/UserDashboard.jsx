import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import MapView from "./MapView";

const socket = io("http://localhost:5000"); // Adjust the URL as necessary

const UserDashboard = () => {
  const [stopName, setStopName] = useState("");
  const [driverLocation, setDriverLocation] = useState(null);

  const joinRoute = (e) => {
    e.preventDefault();
    if (stopName) {
      socket.emit("join-route", { studentId: "student456", stopName });
      console.log("📩 Sent join-route event with stop:", stopName);
      setStopName("");
    }
  };

  useEffect(() => {
    console.log("🟡 Attempting to connect to WebSocket...");

    socket.on("bus-location", (location) => {
      console.log("📡 Received bus-location event");
      console.debug("🛠️ Raw location data:", location);
      if (location && typeof location.latitude === "number" && typeof location.longitude === "number") {
        console.log("✅ Driver location received:", location);
        setDriverLocation(location);
      } else {
        console.error("❌ Invalid driver location received:", location);
      }
    });
    console.log("🟢 bus-location event listener added");

    socket.on("disconnect", (reason) => {
      console.warn("❌ Disconnected from WebSocket server:", reason);
    });

    return () => {
      socket.off("bus-location");
      socket.off("disconnect");
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
                stopName ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!stopName}
            >
              Join Route
            </button>
          </form>
        </div>
      </div>
      {driverLocation && <MapView driverLocation={driverLocation} />}
    </div>
  );
};

export default UserDashboard;