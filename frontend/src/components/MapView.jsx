import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ driverLocation }) => {
    const defaultCenter = [22.307159, 73.181221]; // Default to India
    

    return (
        <MapContainer

            center={driverLocation ? [driverLocation.latitude, driverLocation.longitude] : defaultCenter}
            zoom={13}
            style={{ height: "100vh", width: "100%", zIndex: 0, position: "absolute", bottom: 0 }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {driverLocation && (
                <Marker position={[driverLocation.latitude, driverLocation.longitude]}>
                    <Popup>Driver's Current Location</Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default MapView;
