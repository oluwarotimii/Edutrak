import { motion } from 'framer-motion';
import '@/styles/globals.css';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 1 }} 
          className="text-4xl font-bold mb-6"
        >
          Contact Us
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 1.5 }} 
          className="mb-8"
        >
          We are here to help you. Reach out anytime!
        </motion.p>
        <motion.a 
          href="mailto:contact@company.com" 
          whileHover={{ scale: 1.1 }} 
          className="px-8 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-secondary hover:text-white transition-all"
        >
          Email Us
        </motion.a>
      </div>
    </section>
  );
};

export default Contact;
