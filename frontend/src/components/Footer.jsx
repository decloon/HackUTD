// eslint-disable-next-line no-unused-vars
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-black py-8 px-4" id='team'>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div>
          <h1 className="text-black text-2xl font-bold flex md:justify-start justify-center">PropertyAI</h1>
          <p className="mt-2 text-sm">
            Innovating commercial real estate with sustainable solutions. Your partner in eco-friendly office spaces.
          </p>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Contact Details */}
          <div className="flex flex-col sm:items-start items-center">
            <h3 className="text-lg font-bold text-black mb-2">Contact Details</h3>
            <p className="text-sm">Email: contact@propertyai.com</p>
            <p className="text-sm">Phone: +1 (555) 123-4567</p>
          </div>

          {/* Location & Social Links */}
          <div className="flex flex-col sm:items-start items-center">
            <h3 className="text-lg font-bold text-black mb-2">Location</h3>
            <p className="text-sm">Dallas, Texas</p>

            <div className="mt-4 flex gap-4">
              <a href="#" className="text-black">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="text-black">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-black">
                <FaLinkedinIn size={18} />
              </a>
              <a href="#" className="text-black">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} PropertyAI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
