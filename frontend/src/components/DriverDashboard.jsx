import React, { useState, useEffect } from "react";
import socket from "./socket";
import MapView from "./MapView";

const DriverDashboard = () => {
    const [routeName, setRouteName] = useState("");
    const [isTripStarted, setIsTripStarted] = useState(false);
    const [driverLocation, setDriverLocation] = useState(null);
    const [watchId, setWatchId] = useState(null); // Store geolocation watcher ID

    const startTrip = () => {
        if (!routeName) {
            console.error("Route name is not set.");
            return;
        }
        socket.emit("start-trip", { driverId: "driver123", routeName });
        setIsTripStarted(true);
        trackLocation(); // Start tracking location
    };

    const endTrip = () => {
        socket.emit("end-trip", { driverId: "driver123", routeName });
        setIsTripStarted(false);
        setRouteName(""); // Reset the route selection
        setDriverLocation(null); // Clear driver’s location

        // Stop tracking driver’s location
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            setWatchId(null);
        }
    };

    const trackLocation = () => {
        if (navigator.geolocation) {
            const id = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setDriverLocation({ latitude, longitude });
                    socket.emit("update-location", {
                        driverId: "driver123",
                        routeName,
                        latitude,
                        longitude,
                    });
                },
                (error) => console.error("Error getting location:", error),
                { enableHighAccuracy: true, maximumAge: 0 }
            );
            setWatchId(id);
        }
    };

  useEffect(() => {
    let interval;
    if (isTripStarted) {
      updateLocation(); // Send location immediately after starting the trip
      interval = setInterval(updateLocation, 1500); // Send location every 5 seconds
    }
    return () => clearInterval(interval); // Cleanup interval
  }, [isTripStarted]);

    return (
        <div>
            <div className="w-full h-screen flex justify-center items-end">
                <div className="z-[100] mb-20 md:mb-10 bg-white shadow-lg rounded-2xl p-6 space-y-4 max-w-sm">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center">
                        Driver Dashboard
                    </h2>
                    <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setRouteName(e.target.value)}
                        value={routeName}
                        disabled={isTripStarted} // Prevent changing route when trip is active
                    >
                        <option value="">Select Route</option>
                        <option value="Route1">Route 1</option>
                        <option value="Route2">Route 2</option>
                        <option value="Route3">Route 3</option>
                    </select>

                    {/* Start Trip Button */}
                    {!isTripStarted ? (
                        <button
                            className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition ${
                                routeName ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed"
                            }`}
                            onClick={startTrip}
                            disabled={!routeName}
                        >
                            Start Trip
                        </button>
                    ) : (
                        /* End Trip Button */
                        <button
                            className="w-full py-3 px-4 text-white font-semibold bg-red-500 hover:bg-red-600 rounded-lg transition"
                            onClick={endTrip}
                        >
                            End Trip
                        </button>
                    )}
                </div>
            </div>
            <MapView driverLocation={driverLocation} isTripStarted={isTripStarted} />
        </div>
    );
};

export default DriverDashboard;