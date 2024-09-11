import { motion } from 'framer-motion';
import '@/styles/globals.css';

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <motion.h1 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }} 
        className="text-5xl md:text-7xl font-bold mb-4"
      >
        Welcome to Our Service
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.5 }} 
        className="text-lg md:text-2xl mb-8"
      >
        Your journey towards innovation starts here.
      </motion.p>
      <motion.a 
        href="#contact" 
        initial={{ scale: 0.8 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 0.5 }} 
        className="px-6 py-3 bg-accent text-primary font-semibold rounded-lg shadow-md hover:bg-secondary hover:text-white transition-all"
      >
        Get Started
      </motion.a>
    </div>
  );
};

export default Hero;
