import React, { useState, useEffect } from "react";
import socket from "./socket";

const DriverDashboard = () => {
    const [routeName, setRouteName] = useState("");
    const [isTripStarted, setIsTripStarted] = useState(false);

    const startTrip = () => {
        if (routeName) {
            socket.emit("start-trip", { driverId: "driver123", routeName });
            setIsTripStarted(true);
            console.log("Trip started:", routeName);
        }
    };

    const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                socket.emit("update-location", {
                    driverId: "driver123",
                    latitude,
                    longitude,
                });
                console.log("Location sent:", { latitude, longitude });
            });
        }
    };

    useEffect(() => {
        let interval;
        if (isTripStarted) {
            interval = setInterval(updateLocation, 5000); // Send location every 5 seconds
        }
        return () => clearInterval(interval); // Cleanup interval
    }, [isTripStarted]);

    return (
        <div>
            <h2>Driver Dashboard</h2>
            <select onChange={(e) => setRouteName(e.target.value)} value={routeName}>
                <option value="">Select Route</option>
                <option value="Route1">Route 1</option>
                <option value="Route2">Route 2</option>
            </select>
            <button onClick={startTrip} disabled={!routeName}>
                Start Trip
            </button>
        </div>
    );
};

export default DriverDashboard;
