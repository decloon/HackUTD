// eslint-disable-next-line no-unused-vars
import React from "react";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const SlideInFromRight = ({ children, duration = 1, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "20%" }} // Element starts slightly off to the right
      whileInView={{ opacity: 1, x: 0 }} // Slides into its original position
      transition={{ duration, delay }} // Timing settings
      viewport={{ amount: 0.5 }} // Trigger animation when 50% of it is in view (default: repeatable)
    >
      {children}
    </motion.div>
  );
};

export default SlideInFromRight;