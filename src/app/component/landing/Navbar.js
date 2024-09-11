import { motion } from 'framer-motion';
import '@/styles/globals.css';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -50 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.5, ease: "easeOut" }} 
      className="flex justify-between items-center p-4 bg-white shadow-md"
    >
      <div className="text-2xl font-bold text-primary">BrandLogo</div>
      <ul className="hidden md:flex space-x-6">
        <li><a href="#features" className="hover:text-secondary">Features</a></li>
        <li><a href="#about" className="hover:text-secondary">About</a></li>
        <li><a href="#contact" className="hover:text-secondary">Contact</a></li>
      </ul>
      <button className="md:hidden bg-secondary text-white p-2 rounded">Menu</button>
    </motion.nav>
  );
};

export default Navbar;
