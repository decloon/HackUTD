// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "./Navbar";
import bG from "../assets/bgv.mp4";
import assistant from "../assets/assistantImg.png";
import { TypeAnimation } from "react-type-animation";


const Landing = () => {

  return (
    <div
      className="w-full h-fit relative"
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
      <div className="flex flex-row gap-4 relative bg-opacity-[27%] bg-blue-950 w-full h-[100vh]">
        <div className="relative">
          <img
            src={assistant}
            className="z-10 h-[75vh] w-auto ml-4 mt-8 hover:scale-105 ease-in-out duration-500 hover:cursor-pointer"
          />
          <div className="relative bottom-[-10px] left-0 right-0 mx-auto w-[90%] h-8 bg-black/20 rounded-full blur-lg pointer-events-none"></div>
          <div className="absolute top-3 right-8">
            <h1 className="text-white text-lg p-4 bg-purple-600 rounded-3xl w-fit hover:bg-black ease-in-out duration-300 hover:cursor-pointer hover:scale-110">
              <a href="#moredetails">Click on me for personalized chat!</a>
            </h1>
          </div>
        </div>

        <div className="pl-40 pt-10 flex flex-col space-y-5">
          <h1 className="text-white text-8xl z-10 font-semibold">
            <TypeAnimation
              sequence={[
                "Innovating", // First line
                1000, // Pause
                "Innovating\nCommercial", // Add second line
                1000, // Pause
                "Innovating\nCommercial\nReal Estate with", // Add third line
                1000, // Pause
                "Innovating\nCommercial\nReal Estate with\nSustainability", // Add fourth line
                1000, // Pause
              ]}
              speed={50} // Typing speed
              wrapper="div" // Render as a block element
              repeat={Infinity} // Loop animation indefinitely
              className="whitespace-pre-line" // Preserve new lines
            />
          </h1>
          <p className="text-white text-2xl">
            <TypeAnimation
              sequence={[
                "Making eco-friendly office spaces accessible and efficient", // Full text
                1000, // Pause for 2 seconds after typing
              ]}
              speed={50} // Typing speed in milliseconds
              wrapper="span" // Wrapper element for the animation
              repeat={Infinity} // Loop animation
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
