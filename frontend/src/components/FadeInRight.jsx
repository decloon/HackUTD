// eslint-disable-next-line no-unused-vars
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// eslint-disable-next-line react/prop-types, no-unused-vars
const FadeInRight = ({ children, duration = 1, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 }); // Detects visibility

  // Debugging visibility
  console.log("Is in view:", isInView);

  return (
    <motion.div
    whileInView={{ opacity: 1, x: 0 }}
    initial={{ opacity: 0, x: "-100%" }}
    transition={{ duration: 1 }}
  >
    {children}
  </motion.div>
  
  );
};

export default FadeInRight;