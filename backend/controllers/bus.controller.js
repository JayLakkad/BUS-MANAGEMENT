import { routes } from '../utils/busroutes.js';

let activeDrivers = {};
let studentRoutes = {};

const getRouteForStop = (stopName) => {
    for (const [route, stops] of Object.entries(routes)) {
        if (stops.includes(stopName)) {
            return route;
        }
    }
    return null;
};

// Driver starts the trip
export const startTrip = (socket, { driverId, routeName }) => {
    if (routes[routeName]) {
        activeDrivers[driverId] = routeName;
        socket.join(routeName);
        console.log(`Driver ${driverId} started a trip on ${routeName}`);
    }
};

// Driver updates location
export const updateLocation = (socket, { driverId, latitude, longitude }) => {
    const routeName = activeDrivers[driverId];
    if (routeName) {
        socket.to(routeName).emit("Bus-Location", { latitude, longitude });
    }
};

// Student joins a route
export const joinRoute = (io,socket, { studentId, stopName }) => {
    const routeName = getRouteForStop(stopName);
    if (routeName) {
        studentRoutes[studentId] = routeName;
        socket.join(routeName);
        console.log(`Student ${studentId} joined ${routeName}`);
    } else {
        console.log(`No route found for stop: ${stopName}`);
    }
};

// Handle Socket.IO events
export const handleSocketEvents = (io) => {
    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);
  
      socket.on("start-trip", (data) => {
        console.log("Received start-trip event:", data);
        startTrip(io, socket, data);
      });
  
      socket.on("update-location", (data) => {
        console.log("Received update-location event:", data);
        updateLocation(io, socket, data);
      });
  
      socket.on("join-route", (data) => {
        console.log("Received join-route event:", data);
        joinRoute(io, socket, data);
      });
  
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  };