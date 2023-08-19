"use client"
import VideoCall from "@/components/VideoMenu";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [connect, setConnect] = useState(false);
  const handleButtonClick = () => {
    setConnect(true);
  };

  return (
    <>
      {connect ? (
        <VideoCall />
      ) : (
        <div className="w-screen h-screen flex flex-col items-center text-center justify-center gap-4">
          <h1 className="text-4xl font-bold">Welcome to Talk Video</h1>
          <p className="font-bold font-mono">
            An ultimate Video calling app using WebRTC
          </p>
          <button
            className="bg-black  text-white px-4 rounded-lg py-3"
            onClick={handleButtonClick}
          >
            Connect to call
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
