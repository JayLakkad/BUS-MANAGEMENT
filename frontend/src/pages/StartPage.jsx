import React from "react";
import {Link} from 'react-router-dom';

const StartPage = () => {
  return (
    <div>
      <div className="w-screen h-screen relative overflow-hidden font-['f1'] bg-black">
        <video autoPlay loop muted playsInline className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2 opacity-50" src="https://videos.pexels.com/video-files/3405803/3405803-sd_640_360_30fps.mp4"></video>
        <img className="absolute top-0 left-0 h-28" src="./src/assets/images/pu-logo.png" alt="pu-logo" />
        <div className="w-full h-[100%] relative flex flex-col justify-center items-center">
          <div className="w-full h-3/4 flex flex-col justify-center items-center p-20 gap-10">
            <h1 className="text-5xl text-center font-normal text-zinc-50 drop-shadow-lg">Bus Management System</h1>
            <h1 className="text-6xl text-center font-['f2'] drop-shadow-lg ">Parul <span className="text-red-500"> University</span></h1>
          </div>
          <div className="w-full h-[1/4] px-20">
            <Link to='/who-is-login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
