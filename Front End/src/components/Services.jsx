
import BackgroundImg from "../assets/Group 2.png";
import PropTypes from 'prop-types'; // Import PropTypes for validation
import Img1 from '../assets/divimage1.png';
import Img2 from '../assets/divimage2.png';

export const Services = ({ onScrollToPhase, onScrollToCalendar }) => {
   
    return (
      <div className="relative w-full h-[1200px] " id="services">
        {/* Background Image as Cover */}
        <img 
            src={BackgroundImg} 
            className="absolute w-full h-full object-cover" 
            alt="Cover"
        />
        
        {/* Header title */}
        <div className='absolute justify-center pl-[720px] pt-[45px] pb-[75px]'>
          <h1 className="text-white font-semibold text-[90px]">Dashboard</h1>
        </div>

        {/* Title Overlay on top of background */}
        <div className="absolute inset-0 flex flex-col items-center justify-center top-[200px]">
          
          {/* Buttons */}
          <div className='flex justify-around items-center space-x-40 pt-[80px] pb-[240px]'>
          <div className='relative w-[400px] h-[400px] bg-white border rounded-2xl hover:scale-110'>
          <img src={Img1} className='w-full h-full object-cover z-10'/>
            {/* First Button: Log Period */}
            <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20'> 
            <button 
              onClick={onScrollToCalendar}  // Scroll to Calendar on button click
              className="bg-purple-200 text-purple-800 text-2xl px-10 py-9 rounded-full shadow-md hover:bg-purple-300 ">
              Log Period
            </button>
            </div>
            </div>

            {/* Second Button: Current Phase */}
            <div className='relative w-[400px] h-[400px] bg-white border rounded-2xl hover:scale-110'>
              <img src={Img2} className='w-full h-full object-cover z-10'/>
            <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20'>  
            <button 
              onClick={onScrollToPhase}  // Scroll to Phase on button click
              className="bg-purple-200 text-purple-800 text-2xl px-6 py-9 rounded-full shadow-md hover:bg-purple-300">
              Current Phase
            </button>
            </div>
          </div>
         
          </div>

          {/* Circular Red Buttons at the bottom */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-20 pb-[150px] pr-[40px]">
            {/* Blue Button */}
            <button className="w-28 h-28 rounded-full shadow-lg hover:opacity-80 transition-colors" style={{ backgroundColor: '#ADBFE5' }}></button>
            {/* Pinkish Button */}
            <button className="w-28 h-28 rounded-full shadow-lg hover:opacity-80 transition-colors" style={{ backgroundColor: '#F4CCCC' }}></button>
            {/* Greenish Button */}
            <button className="w-28 h-28 rounded-full shadow-lg hover:opacity-80 transition-colors" style={{ backgroundColor: '#9ACBCB' }}></button>
            {/* Red Button */}
            <button className="w-28 h-28 rounded-full shadow-lg hover:opacity-80 transition-colors" style={{ backgroundColor: '#FF8181' }}></button>
          </div>
        </div>
      </div>
    );
}

// Add PropTypes to validate props
Services.propTypes = {
  onScrollToPhase: PropTypes.func.isRequired, // Require onScrollToPhase as a function
  onScrollToCalendar: PropTypes.func.isRequired, // Require onScrollToCalendar as a function
};

export default Services;

