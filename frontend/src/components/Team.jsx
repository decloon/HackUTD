import Zabir from '../assets/zabir.jpg';
import Vasu2 from '../assets/flower.jpg';
import { ReactTyped } from 'react-typed';
import FadeInWrapper from '../animations/FadeInWrapper';

export const Team = () => {
  return (
    <div className="w-full h-full pb-36" style={{ backgroundColor: "hsl(226, 42%, 20%)" }}>
      {/* Header title */}
      <div className="flex justify-center pt-10 pb-12">
        <h1 className="text-white font-semibold text-3xl md:text-5xl">
          <ReactTyped strings={["Meet the Team"]} typeSpeed={40} backSpeed={30} loop />
        </h1>
      </div>

      {/* Team Members Section */}
      <FadeInWrapper>
      <div className="flex flex-wrap justify-center gap-6 px-12">
        {/* First Box - Ahnaf */}
        <div className="w-full sm:w-[300px] h-auto bg-purple-950 border rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <img
            src={Zabir}
            className="w-full h-[200px] md:h-[240px] object-cover rounded-t-2xl"
            alt="Ahnaf"
          />
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-white">Md Ahnaf Al Zabir</h3>
            <a
              href="https://www.linkedin.com/in/md-ahnaf-al-zabir"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-purple-200 text-purple-800 text-sm px-4 py-2 rounded-full shadow-md mt-2 hover:bg-purple-300">
                Contact
              </button>
            </a>
          </div>
        </div>

        {/* Second Box - Declan */}
        <div className="w-full sm:w-[300px] h-auto bg-purple-950 border rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <img
            src={Vasu2}
            className="w-full h-[200px] md:h-[240px] object-cover rounded-t-2xl"
            alt="Declan"
          />
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-white">Declan Staunton</h3>
            <button className="bg-purple-200 text-purple-800 text-sm px-4 py-2 rounded-full shadow-md mt-2 hover:bg-purple-300">
              Contact
            </button>
          </div>
        </div>

        {/* Third Box - Abrar */}
        <div className="w-full sm:w-[300px] h-auto bg-purple-950 border rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <img
            src={Vasu2}
            className="w-full h-[200px] md:h-[240px] object-cover rounded-t-2xl"
            alt="Abrar"
          />
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-white">Md Abrar Al Zabir</h3>
            <button className="bg-purple-200 text-purple-800 text-sm px-4 py-2 rounded-full shadow-md mt-2 hover:bg-purple-300">
              Contact
            </button>
          </div>
        </div>

        {/* Fourth Box - Ubaid */}
        <div className="w-full sm:w-[300px] h-auto bg-purple-950 border rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <img
            src={Vasu2}
            className="w-full h-[200px] md:h-[240px] object-cover rounded-t-2xl"
            alt="Ubaid"
          />
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-white">Ubaid Mohammed</h3>
            <button className="bg-purple-200 text-purple-800 text-sm px-4 py-2 rounded-full shadow-md mt-2 hover:bg-purple-300">
              Contact
            </button>
          </div>
        </div>
      </div>
      </FadeInWrapper>
    </div>
  );
};

export default Team;
