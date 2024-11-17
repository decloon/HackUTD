// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "./Navbar";
import bG from "../assets/bgv.mp4";
import assistant from "../assets/assistantImg.png";
import { ReactTyped } from "react-typed";
import FadeInWrapper from "./FadeInWrapper";

const Landing = () => {
  return (
    <div
      className="w-full h-full relative"
      style={{ backgroundColor: "hsl(226, 42%, 20%)" }}
      id="home"
    >
      <Navbar />

      <video
        className="background-video absolute w-full z-0"
        style={{ backgroundColor: "hsl(226, 42%, 20%)" }}
        autoPlay
        loop
        muted
      >
        <source src={bG} type="video/mp4" />
      </video>

      {/* Landing Section */}
      <FadeInWrapper>
      <div className="flex flex-col md:flex-row lg:gap-4 md:gap-0 relative w-full h-[100vh] items-center justify-center px-4">
        {/* Left Section */}
        <div className="sm:w-1/2 relative flex flex-col items-center z-20">
          <img
            src={assistant}
            className="z-10 hover:scale-105 ease-in-out duration-500 hover:cursor-pointer 
            xl:h-[500px] w-auto 
            lg:h-[500px] md:h-[400px] sm:h-[300px] h-[275px]"
          />
          {/* Shadow under the image */}
          <div className="relative bottom-[-10px] left-0 right-0 mx-auto w-[90%] h-8 bg-black/20 rounded-full blur-lg pointer-events-none"></div>

          {/* Click to chat button */}
          <div className="absolute top-[-25px] sm:top-[-15px] md:top-[-15px] right-0 md:right-8 sm:right-4 z-20">
            <h1 className="text-white font-medium text-nowrap text-sm md:text-base lg:text-lg lg:p-4 md:p-3 p-2 bg-purple-600 rounded-3xl w-fit hover:bg-black ease-in-out duration-300 hover:cursor-pointer hover:scale-110">
              <a href="#moredetails">Click on me for personalized chat!</a>
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="sm:w-1/2 w-full mt-8 md:mt-0 md:ml-40 flex flex-col space-y-5  
          h-fit items-center text-center"
        >
          <h1
            className="text-white font-bold 
            text-3xl sm:text-4xl md:text-5xl lg:text-7xl bg-opacity-[20%] bg-blue-950 rounded-3xl"
          >
            Innovating Property Management
            <br /> with Sustainable Solutions
          </h1>
          <p
            className="text-gray-200 
  text-base md:text-xl lg:text-2xl bg-opacity-[27%] bg-blue-950 rounded-2xl p-2 font-semibold"
          >
            <ReactTyped
              strings={[
                "Making eco-friendly office spaces accessible and efficient",
              ]}
              typeSpeed={40}
              backSpeed={30}
              loop
            />
          </p>
        </div>
      </div>
      </FadeInWrapper>
    </div>
  );
};

export default Landing;
