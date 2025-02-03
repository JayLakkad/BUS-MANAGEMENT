import React from 'react';
import { Link } from 'react-router-dom';

const WhoIsLogging = () => {
    return (
        <div className="relative h-screen w-full bg-black text-white font-sans">
            {/* Background Video */}
            <video autoPlay loop muted playsInline className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 opacity-50" src="https://videos.pexels.com/video-files/3405803/3405803-sd_640_360_30fps.mp4"></video>

            {/* Logo */}
            <img className="absolute top-0 left-0 h-28" src="./src/assets/images/pu-logo.png" alt="pu-logo" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center space-y-10">
                <h1 className="text-5xl font-semibold">Identify Yourself</h1>

                <div className="space-y-4">
                    <Link
                        className="block w-60 py-5 backdrop-blur-sm text-xl font-medium text-center border border-white rounded hover:bg-white hover:text-black transition duration-200"
                        to="/user-login"
                    >
                        Student/Staff
                    </Link>
                    <Link
                        className="block w-60 py-5 backdrop-blur-sm text-xl font-medium text-center border border-white rounded hover:bg-white hover:text-black transition duration-200"
                        to="/driver-login"
                    >
                        Driver
                    </Link>
                    <Link
                        className="block w-60 py-5 backdrop-blur-sm text-xl font-medium text-center border border-white rounded hover:bg-white hover:text-black transition duration-200"
                        to="/admin-login"
                    >
                        Admin
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WhoIsLogging;
