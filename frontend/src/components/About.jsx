// eslint-disable-next-line no-unused-vars
import React from "react";
import { LeafIcon, BuildingIcon, UsersIcon, HeartIcon } from "lucide-react";
import FadeInRight from "../animations/FadeInRight";
import FadeInWrapper from "../animations/FadeInWrapper";

const About = () => {
  return (
    <div
      className="w-full h-full xl:pt-96"
      style={{ backgroundColor: "hsl(226, 42%, 20%)" }}
      id="about"
    >
     
        <div className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24">
          {/* Heading Section */}
          <div className="text-center mb-16">
          <FadeInRight duration={1} delay={0}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 text-white">
              Our Sustainable Vision
            </h2>
            </FadeInRight>

            <p className="text-base md:text-xl lg:text-2xl max-w-3xl mx-auto text-gray-300">
              Leading the transformation in commercial real estate by making
              sustainable office spaces the new standard.
            </p>
          </div>

          {/* Stats Section */}
          <FadeInWrapper>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
            <div className="text-center p-8 rounded-lg border hover:scale-105 ease-in-out duration-300 hover:cursor-pointer">
              <div className="text-4xl font-bold text-green-500 mb-2">50%</div>
              <div className="text-white">Average Energy Cost Reduction</div>
            </div>
            
            <div className="text-center p-8 rounded-lg border hover:scale-105 ease-in-out duration-300 hover:cursor-pointer">
              <div className="text-4xl font-bold text-green-500 mb-2">1M+</div>
              <div className="text-white">Square Feet of Green Space</div>
            </div>
            
            <div className="text-center p-8 rounded-lg border hover:scale-105 ease-in-out duration-300 hover:cursor-pointer">
              <div className="text-4xl font-bold text-green-500 mb-2">100+</div>
              <div className="text-white">Sustainable Buildings</div>
            </div>
           
          </div>
          </FadeInWrapper>

          {/* Mission and Values Section */}
          <FadeInWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div>
              <h3 className="text-3xl font-bold mb-6 text-white md:flex md:text-start text-center">
                Our Mission
              </h3>
              <p className="text-gray-300 mb-4">
                We are committed to revolutionizing commercial real estate by
                making sustainable office spaces accessible to businesses of all
                sizes.
              </p>
              <p className="text-gray-300">
                Through innovative green technologies and smart building
                management, we are creating spaces that benefit both our clients
                and the environment.
              </p>
            </div>

            {/* Values */}
            <div>
              <h3 className="text-3xl font-bold mb-6 text-white md:flex md:text-start text-center">
                Our Values
              </h3>
              <div className="flex flex-col md:items-start items-center space-y-4">
                <div className="flex items-center gap-3">
                  <LeafIcon className="w-6 h-6 text-green-500" />
                  <span className="text-gray-300">
                    Environmental Stewardship
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <BuildingIcon className="w-6 h-6 text-green-500" />
                  <span className="text-gray-300">
                    Innovation in Sustainability
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <UsersIcon className="w-6 h-6 text-green-500" />
                  <span className="text-gray-300">Client Success</span>
                </div>
                <div className="flex items-center gap-3">
                  <HeartIcon className="w-6 h-6 text-green-500" />
                  <span className="text-gray-300">Community Impact</span>
                </div>
              </div>
            </div>
          </div>
          </FadeInWrapper>
        </div>
   
    </div>
  );
};

export default About;
