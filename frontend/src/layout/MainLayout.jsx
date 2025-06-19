import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import AudioPlayer from "../components/AudioPlayer/AudioPlayer";

const MainLayout = () => {
  return (
    <div className="realtive">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <div className=" w-full">
        <AudioPlayer />
      </div>
    </div>
  );
};

export default MainLayout;
