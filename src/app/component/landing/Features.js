import { motion } from 'framer-motion';
import '@/styles/globals.css';

const features = [
  { id: 1, title: 'Feature One', description: 'An amazing feature that will solve all your problems.' },
  { id: 2, title: 'Feature Two', description: 'Another great feature to boost your productivity.' },
  { id: 3, title: 'Feature Three', description: 'A feature designed with flexibility in mind.' },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 1 }} 
          className="text-4xl text-center font-bold mb-10"
        >
          Our Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(feature => (
            <motion.div 
              key={feature.id}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white shadow-md rounded-md"
            >
              <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
