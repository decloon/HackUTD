import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Aboutus } from "./components/Aboutus";
import { Services } from "./components/Services";
import { Phase } from "./components/Phase";
import { Footer } from "./components/Footer";
import { Form } from "./components/Form";
import { MoreDetails } from "./components/MoreDetails";
import { useRef, useState } from "react";

export const App = () => {
  // Create refs for the Phase, Calendar, Aboutus, and MoreDetails components
  const phaseRef = useRef(null);
  const calendarRef = useRef(null);
  const aboutUsRef = useRef(null);  // Ref for the Aboutus component
  const moreDetailsRef = useRef(null);

  // State to store the selected date, current phase, and days left
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [phase, setPhase] = useState('');
  const [daysLeft, setDaysLeft] = useState('');

  // Handle the data coming from Hero.jsx (selected date, phase, and days left)
  const handleDateChange = (date, currentPhase, daysLeft) => {
    setSelectedDate(date);
    setPhase(currentPhase);
    setDaysLeft(daysLeft);
  };

  // Function to scroll to the Phase component
  const scrollToPhase = () => {
    phaseRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to scroll to the Calendar component in Hero
  const scrollToCalendar = () => {
    calendarRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to scroll to the Aboutus component
  const scrollToAboutus = () => {
    if (aboutUsRef.current) {
      aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to scroll to the MoreDetails component
  const scrollToMoreDetails = () => {
    if (moreDetailsRef.current) {
      moreDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };  

  return (
    <div>
      <Navbar />
      {/* Add the calendarRef directly to the Hero component */}
      <div ref={calendarRef}>
        <Hero onDateChange={handleDateChange} scrollToAboutus={scrollToAboutus} />
      </div>
      <div ref={aboutUsRef}>
        <Aboutus />
      </div>
      {/* Pass scrollToPhase and scrollToCalendar functions as props to Services */}
      <Services onScrollToPhase={scrollToPhase} onScrollToCalendar={scrollToCalendar} selectedDate={selectedDate} phase={phase} daysLeft={daysLeft} />
      <div ref={phaseRef}>
        <Phase onScrollToMoreDetails={scrollToMoreDetails} phase={phase} daysLeft={daysLeft} />
      </div>
      <div ref={moreDetailsRef}>
        <MoreDetails />
      </div>
      <Form />
      <Footer />
    </div>
  );
};

export default App;
