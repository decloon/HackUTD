// eslint-disable-next-line no-unused-vars
import React from 'react';
import { motion } from 'framer-motion';

// eslint-disable-next-line react/prop-types
const FadeInWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ amount: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWrapper;