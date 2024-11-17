import PropTypes from 'prop-types';
import BgImg from '../assets/Cycle Page.png';
import PejoImg from '../assets/pejo.png';

export const Phase = ({ onScrollToMoreDetails, phase, daysLeft }) => {
  return (
    <div className='h-full w-full relative'>
      {/* Background Image */}
      <img src={BgImg} className='w-[1900px] h-[1300px] object-cover' alt="Background" />

      {/* Overlay Image */}
      <img 
        src={PejoImg} 
        className='absolute bottom-0 left-1/3 opacity-70 transform -translate-x-1/2 w-[80%] h-auto z-10 pt-[250px] hover:scale-110' 
        alt="Overlay" 
      />

      {/* Text and Button Container */}
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20'>
        {/* Display the dynamic phase */}
        <h1 className='text-6xl font-bold text-purple-800 mb-4 pb-[600px]'>
          You are in the {phase} Phase
        </h1>

        {/* Display the days left until the next period */}
        <p className='text-4xl font-semibold text-white mb-32'>
          Days left until next period: {daysLeft}
        </p>

        {/* Additional description */}
        <p className='text-lg text-purple-800 mb-6'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        {/* Button */}
        <button
          onClick={onScrollToMoreDetails}  // Trigger the scroll function when clicked
          className='bg-purple-700 text-white text-lg font-semibold py-2 px-6 rounded-lg hover:bg-purple-600'>
          More Details
        </button>
      </div>
    </div>
  );
}

// PropTypes to validate props
Phase.propTypes = {
  onScrollToMoreDetails: PropTypes.func.isRequired,  // Require onScrollToMoreDetails as a function
  phase: PropTypes.string.isRequired,                // Require phase as a string
  daysLeft: PropTypes.number.isRequired,             // Require daysLeft as a number
};

export default Phase;
