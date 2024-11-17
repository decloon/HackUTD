import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes
import { ReactTyped } from 'react-typed';
import BackgroundImg from "../assets/background.png";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import iPhoneImage from "../assets/iphone-15.png";

export const Hero = ({ onDateChange, scrollToAboutus }) => {  // Add scrollToAboutus prop
  const [date, setDate] = useState(new Date());
  const [phase, setPhase] = useState('');
  const [daysLeft, setDaysLeft] = useState('');

  const calculatePhase = (startDate) => {
    const today = new Date();
    const diffInDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const cycleDay = diffInDays % 28;

    if (cycleDay >= 1 && cycleDay <= 5) {
      return 'Menstrual';
    } else if (cycleDay >= 6 && cycleDay <= 14) {
      return 'Follicular';
    } else if (cycleDay >= 15 && cycleDay <= 18) {
      return 'Ovulatory';
    } else {
      return 'Luteal';
    }
  };

  const daysUntilNextPeriod = (startDate) => {
    const today = new Date();
    const diffInDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    return 28 - (diffInDays % 28);
  };

  useEffect(() => {
    const currentPhase = calculatePhase(date);
    const daysLeft = daysUntilNextPeriod(date);
    onDateChange(date, currentPhase, daysLeft);  // Call the prop function
  }, [date, onDateChange]);

  return (
    <div className="h-full w-full bg-white">
      <div className="flex items-center relative">
        <img src={BackgroundImg} className="top-0 left-0 w-full h-full object-cover" alt="Background" />
        <div className="absolute">
          <h1 className="z-20 pl-20 text-6xl flex pb-50 text-start hover:text-gray-600 hover:cursor-pointer font-medium">
            <ReactTyped strings={["Introducing Lock Into the Moon"]} typeSpeed={40} backSpeed={50} loop />
          </h1>
          <p className="z-20 text-white text-2xl pl-20 pt-10">
          Lock Into the Moon is a menstrual health app designed to help users track <br/> and calculate their menstrual cycle phases, and offer personalized nutrition <br/>recommendations based on the users current cycle phase. 


          </p>
        </div>

        {/* Right div - iPhone with Calendar */}
        <div className="absolute right-10 bottom-0 flex flex-col items-center pb-[150px]">
          <div className="relative pr-[50px]">
            {/* iPhone Image */}
            <img src={iPhoneImage} alt="iPhone 15" className="w-[700px] h-[850px] object-cover z-20 hover:scale-105" />
            {/* Calendar inside iPhone */}
            <div className="absolute top-[60px] left-[10px] w-[710px] h-[730px] pt-[290px] pl-[300px] overflow-hidden z-10">
              <Calendar onChange={setDate} value={date} className="w-full h-full" />
              {/* New Text Line */}
              <p className="text-white text-lg mt-4 text-center">Select the first day of your last period</p>
              {/* Save Button with onClick to trigger scroll */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 pb-[100px] pl-[300px]">
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600"
                  onClick={scrollToAboutus}  // Trigger scroll to Aboutus section
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for Hero component
Hero.propTypes = {
  onDateChange: PropTypes.func.isRequired,  // Expect onDateChange to be a required function
  scrollToAboutus: PropTypes.func.isRequired,  // Expect scrollToAboutus to be a required function
};

export default Hero;
