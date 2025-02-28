import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom Icons for Start and End Markers
const startIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/kml/paddle/grn-circle.png",
  iconSize: [40, 40],
});

const endIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/kml/paddle/red-circle.png",
  iconSize: [40, 40],
});

const MapView = ({ driverLocation, isTripStarted }) => {
  const defaultCenter = [22.307159, 73.181221]; // Default location
  const parulUniversity = [22.2882, 73.3637]; // Parul University coordinates
  const [route, setRoute] = useState([]);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  useEffect(() => {
    if (driverLocation && driverLocation.latitude && driverLocation.longitude) {
      console.log("📡 Driver Location Updated:", driverLocation);
      setMapCenter([driverLocation.latitude, driverLocation.longitude]);
    }
  }, [driverLocation]); // Update map center every time driver moves

  useEffect(() => {
    console.log("🚌 Is Trip Started:", isTripStarted);
    if (isTripStarted && driverLocation?.latitude && driverLocation?.longitude) {
      fetchRoute(driverLocation, parulUniversity);
    } else {
      setRoute([]); // Clear route when trip ends
    }
  }, [isTripStarted, driverLocation]);

  const fetchRoute = async (start, end) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end[1]},${end[0]}?geometries=geojson`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const routeCoords = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        console.log("🚀 Route Coordinates:", routeCoords);
        setRoute(routeCoords);
      } else {
        console.error("⚠️ No valid route found in API response");
      }
    } catch (error) {
      console.error("❌ Error fetching route:", error);
    }
  };

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      style={{
        height: "100vh",
        width: "100%",
        zIndex: 0,
        position: "absolute",
        bottom: 0,
      }}
    >
      {/* Satellite Layer */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
      />
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        attribution="Esri &mdash; Source: Esri, HERE, Garmin, FAO, NOAA, USGS, and EPA"
      />

      {/* Driver's Marker (Start) */}
      {driverLocation?.latitude && driverLocation?.longitude && (
        <Marker position={[driverLocation.latitude, driverLocation.longitude]} icon={startIcon}>
          <Popup>🚖 Driver is here</Popup>
        </Marker>
      )}

      {/* Parul University Marker (End) - Shown Only When Trip Starts */}
      {isTripStarted && (
        <Marker position={parulUniversity} icon={endIcon}>
          <Popup>🏫 Parul University</Popup>
        </Marker>
      )}

      {/* Route Polyline (Only visible when trip is active) */}
      {isTripStarted && route.length > 0 && <Polyline positions={route} color="blue" weight={5} />}
    </MapContainer>
  );
};

export default MapView;
