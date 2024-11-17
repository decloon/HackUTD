import Zabir from '../assets/zabir.jpg';
import Vasu2 from '../assets/flower.jpg';
import { ReactTyped } from 'react-typed';

export const Team = () => {
  return (
    <div className="w-full h-full pb-36" style={{ backgroundColor: "hsl(226, 42%, 20%)" }}>
      {/* Background Image as Cover */}
     
      
      {/* Header title */}
      <div className="flex justify-center pt-[45px] pb-24">
        <h1 className="text-white font-semibold text-5xl">
          <ReactTyped strings={["Meet the Team"]} typeSpeed={40} backSpeed={30} loop />
        </h1>
      </div>

      {/* Main Overlay Content */}
      <div className="inset-0 flex flex-col items-center justify-center top-[200px]">
        
        {/* Row of Four Div Boxes */}
        <div className="flex space-x-6">
          
          {/* First Box - Ahnaf */}
          <div className="w-[300px] h-[360px] bg-purple-950 border rounded-2xl shadow-lg hover:scale-105 transition-transform float-animation">
            <img src={Zabir} className="w-full h-2/3 object-cover rounded-t-2xl" alt="Mentee 1" />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-white">Md Ahnaf Al Zabir</h3>
              <a href="www.linkedin.com/in/md-ahnaf-al-zabir" target="_blank" rel="noopener noreferrer">
              <button
                className="bg-purple-200 text-purple-800 text-sm px-4 py-2 rounded-full shadow-md mt-2 hover:bg-purple-300"
              >
                Contact
              </button>
              </a>
            </div>
          </div>

          {/* Second Box - Declan */}
          <div className="w-[300px] h-[360px] bg-purple-950 border rounded-2xl shadow-lg relative hover:scale-105 transition-transform float-animation">
            <img src={Vasu2} className="w-full h-2/3 object-cover rounded-t-2xl" alt="Mentee 2" />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-white">Declan Staunton</h3>
              <button
                className="bg-purple-200 text-purple-800 text-sm px-4 py-2 rounded-full shadow-md mt-2 hover:bg-purple-300"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Third Box - Abrar */}
          <div className="w-[300px] h-[360px] bg-purple-950 border rounded-2xl shadow-lg relative hover:scale-105 transition-transform float-animation">
            <img src={Vasu2} className="w-full h-2/3 object-cover rounded-t-2xl" alt="Mentee 3" />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-white">Md Abrar Al Zabir</h3>
              <button
                className="bg-purple-200 text-purple-800 text-sm px-4 py-2 rounded-full shadow-md mt-2 hover:bg-purple-300"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Fourth Box -  Ubaid */}
          <div className="w-[300px] h-[360px] bg-purple-950 border rounded-2xl shadow-lg relative hover:scale-105 transition-transform float-animation">
            <img src={Vasu2} className="w-full h-2/3 object-cover rounded-t-2xl" alt="Mentee 4" />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-white">Ubaid Mohammed</h3>
              <button
                className="bg-purple-200 text-purple-800 text-sm px-4 py-2 rounded-full shadow-md mt-2 hover:bg-purple-300"
              >
                Contact
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}



export default Team;