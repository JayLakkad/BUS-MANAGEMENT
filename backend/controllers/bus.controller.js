import { routes } from "../utils/busroutes.js";

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
export const startTrip = (io, socket, { driverId, routeName }) => {
  if (routes[routeName]) {
    activeDrivers[driverId] = { routeName, location: null };
    socket.join(routeName);
    console.log(`🚍 Driver ${driverId} started a trip on ${routeName}`);
  }
};

// Driver updates location
export const updateLocation = (io, socket, { driverId, latitude, longitude }) => {
  const driver = activeDrivers[driverId];

  if (driver) {
    driver.location = { latitude, longitude };
    console.log(`📤 Broadcasting bus location to route: ${driver.routeName}`);
    io.to(driver.routeName).emit("bus-location", { latitude, longitude });
  } else {
    console.warn(`⚠️ No active route found for driver ${driverId}`);
  }
};

// Student joins a route
export const joinRoute = (io, socket, { studentId, stopName }) => {
  const routeName = getRouteForStop(stopName);
  if (routeName) {
    studentRoutes[studentId] = routeName;
    socket.join(routeName);
    console.log(`🧑‍🎓 Student ${studentId} joined ${routeName}`);

    // Send the current location of the driver to the student
    const driverId = Object.keys(activeDrivers).find(id => activeDrivers[id].routeName === routeName);
    if (driverId && activeDrivers[driverId].location) {
      const { latitude, longitude } = activeDrivers[driverId].location;
      socket.emit("bus-location", { latitude, longitude });
      console.log(`📡 Sent current location of driver ${driverId} to student ${studentId}`);
    } else {
      console.warn(`⚠️ No active driver found for route: ${routeName}`);
    }
  } else {
    console.warn(`⚠️ No route found for stop: ${stopName}`);
  }
};

// Handle WebSocket events
export const handleSocketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ A user connected:", socket.id);

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
      console.log("❌ User disconnected:", socket.id);
    });
  });
};