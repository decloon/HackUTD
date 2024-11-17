
import BgImg from "../assets/Cycle Page.png"

export const Aboutus = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="w-full" id="aboutus">
        {/* top div */}
        <div className="flex justify-center items-center w-full h-full absolute z-20">
           
        </div>
        {/* bottom div */} 
        <div className="relative w-full h-full bg-cover bg-center">
            <img src={BgImg} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-black text-4xl font-bold p-4 rounded-md font-lobster pt-[60px]">
                Disclaimer <br/> <br /> <br/> <br/>
              This app assumes a regular cycle<br/> for predictions and should not be<br/> used for medical advice. <br/> <br/> <br/>
              Please consult a healthcare provider<br/> for any health concerns.
              </p>
              <div className='pt-[600px]'>
              <button className="mt-8 bg-purple-600 text-white text-xl font-bold py-6 px-8 rounded shadow hover:bg-purple-700"
              onClick={scrollToServices}>
            Next
          </button>
          </div>
            </div>
        </div>
    </div>
  )
}

export default Aboutus
