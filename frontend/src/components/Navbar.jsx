// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };

  return (
    <div className="h-[85px] w-full flex flex-row justify-between items-center px-8 border rounded-2xl border-purple-400 p-2" style={{ backgroundColor: "hsl(226, 42%, 20%)" }}>
      <div>
        <h1 className="text-white text-2xl">Property AI</h1>
      </div>
      <div>
        <ul className="text-white text-base justify-between gap-9 hidden md:flex">
          <li className="text-lg hover:text-purple-500 hover:cursor-pointer ease-in-out duration-500 text-purple-300">
            <a href="#home">Home</a>
          </li>
          <li className="text-lg hover:text-purple-500 hover:cursor-pointer ease-in-out duration-500 text-purple-300">
            <a href="#about">About</a>
          </li>
          <li className="text-lg hover:text-purple-500 hover:cursor-pointer ease-in-out duration-500 text-purple-300">
            <a href="#moredetails">Document</a>
          </li>
        </ul>
      </div>
      <div className="md:flex md:flex-row md:gap-3">
        <div className="hidden md:flex px-3 py-2 bg-purple-600 border rounded-lg hover:bg-purple-700 hover:cursor-pointer">
          <h1 className="text-white">
            <a href="#moredetails">Chat Now</a></h1>
        </div>
        <div className="hidden md:flex px-3 py-2 rounded-lg border border-purple-400 hover:cursor-pointer text-purple-400 hover:text-white hover:bg-gray-900 ease-in-out duration-500">
          <h1><a href="#team">Contact Us</a></h1>
        </div>
        <div
          onClick={handleNav}
          className="block md:hidden mr-2 cursor-pointer"
        >
          {nav ? (
            <AiOutlineClose size={20} color="white" className="z-20" />
          ) : (
            <AiOutlineMenu size={20} color="white" className="z-20" />
          )}
        </div>
        <div
          className={
            nav
              ? "fixed top-10 right-0 h-full w-[170px] md:w-[240px] flex flex-col bg-gray-800 text-center ease-in-out duration-500 z-10"
              : "hidden"
          }
        >
          <ul className="p-8 text-2xl mt-5">
            <li
              className="p-2 text-lg hover:text-purple-500 hover:cursor-pointer ease-in-out duration-500 text-purple-300"
              onClick={closeNav}
            >
              <a href="#home">Home</a>
            </li>
            <li
              className="p-2 text-lg hover:text-purple-500 hover:cursor-pointer ease-in-out duration-500 text-purple-300"
              onClick={closeNav}
            >
              <a href="#about">About</a>
            </li>
            <li
              className="p-2 text-lg hover:text-purple-500 hover:cursor-pointer ease-in-out duration-500 text-purple-300"
              onClick={closeNav}
            >
              <a href="#document">Document</a>
            </li>
            <div className="flex flex-col space-y-3 mt-3">
              <div className="flex px-3 py-2 bg-purple-600 border rounded-lg hover:bg-purple-700 hover:cursor-pointer">
                <h1 className="text-white text-base">Chat Now</h1>
              </div>
              <div className="flex px-3 py-2 rounded-lg border border-purple-400 hover:cursor-pointer text-purple-400 hover:text-white hover:bg-gray-900 ease-in-out duration-500">
                <h1 className="text-base">Contact Us</h1>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
