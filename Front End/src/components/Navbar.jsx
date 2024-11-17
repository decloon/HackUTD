import LogoImg from "../assets/LOGO.png";
import { useState } from 'react';
import navOpenIcon from '../assets/navOpen.png';
import navCloseIcon from '../assets/navClose.png';
import BgImg from '../assets/background.png';

export const Navbar = () => {
  const [nav, setNav] = useState(true);

  const toggleNav = () => {
    setNav(!nav);
  };

  return (
    <div 
      className="relative h-[150px] w-full flex justify-between items-center border-gray-200 rounded-lg shadow-md z-20"
      style={{ backgroundImage: `url(${BgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* left div */}
      <div className="pt-20 pl-10 z-30">
        <img src={LogoImg} className="h-[300px] w-[420px] pb-[40px]" alt="Logo" />
      </div>

      {/* right div */}
      <div className='hidden lg:flex pr-20 gap-8 pt-20 items-center pb-[35px] z-30'>
        <ul className='flex gap-12 pr-12'>
          <li className='hover:cursor-pointer hover:text-gray-600 text-white font-semibold text-2xl'>
            <a href="#aboutus">About Us</a>
          </li>
          <li className='hover:cursor-pointer hover:text-gray-600 text-white font-semibold text-2xl'>
            <a href="#services">Services</a>
          </li>
          <li className='hover:cursor-pointer hover:text-gray-600 text-white font-semibold text-2xl'>
            <a href="#form">Chat Form</a>
          </li>
        </ul>
      </div>

      {/* Hamburger Nav's div */}
      <div onClick={toggleNav} className="lg:hidden w-full flex justify-end z-30">
        {nav ? (
          <img src={navOpenIcon} className='h-[50px] w-[50px] bg-teal-400' alt="Open Nav" />
        ) : (
          <img src={navCloseIcon} className="h-[30px] w-[30px] mr-2 bg-teal-400" alt="Close Nav" />
        )}
      </div>

      {/* Dropdown menu styled */}
      <div className={nav ? "hidden" : "w-1/5 h-fit absolute right-0 top-[45px] flex flex-col items-center pb-8 pt-20 z-30 bg-teal-500"}>
        <ul className="flex flex-col">
          <li className="hover:cursor-pointer hover:text-gray-600">
            <a href="#aboutus">About Us</a>
          </li>
          <li className='hover:cursor-pointer hover:text-gray-600'>
            <a href="#services">Services</a>
          </li>
          <li className='hover:cursor-pointer hover:text-gray-600'>Reviews</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
