import React, { useState, useEffect } from "react";
import socket from "./socket"; // Adjust the path as necessary
import MapView from "./MapView";

const UserDashboard = () => {
    const [stopName, setStopName] = useState("");
    const [driverLocation, setDriverLocation] = useState(null);

    const joinRoute = () => {
        if (stopName) {
            socket.emit("join-route", { studentId: "student456", stopName });
            console.log("Joined route at stop:", stopName);
        }
    };

    useEffect(() => {
        socket.on("bus-location", (location) => {
            setDriverLocation(location);
            console.log("Updated bus location:", location);
        });

        return () => {
            socket.off("bus-location");
        };
    }, []);

    return (
        <div>
            <h2>User Dashboard</h2>
            <input
                type="text"
                placeholder="Enter your stop name"
                value={stopName}
                onChange={(e) => setStopName(e.target.value)}
            />
            <button onClick={joinRoute} disabled={!stopName}>
                Join Route
            </button>
            <MapView driverLocation={driverLocation} />
        </div>
    );
};

export default UserDashboard;
