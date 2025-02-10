import { io } from "socket.io-client";

// Connect to WebSocket server
const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("Connected to server:", socket.id);

    // Test: Start a trip
    socket.emit("start-trip", { driverId: "driver123", routeName: "Route1" });

    // Test: Update bus location
    setTimeout(() => {
        socket.emit("update-location", {
            driverId: "driver123",
            latitude: 22.5726,
            longitude: 88.3639
        });
    }, 3000);

    // Test: Student joins route
    socket.emit("join-route", { studentId: "student456", stopName: "StopH" });
});

socket.on("bus-location", (data) => {
    console.log("Received Bus Location:", data);
});

socket.on("disconnect", () => {
    console.log("Disconnected from server");
});
