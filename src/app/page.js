"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Footer from './component/shared/footer';
import Header from './component/shared/Header';
import Card from './component/shared/card';
import Button from './component/shared/button';
import Loading from './component/shared/loading';
import { AuthProvider } from './hooks/useAuth';

const LandingPage = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />

        <main className="flex-grow mt-16">
          {/* Hero Section */}
          <motion.section 
            className="bg-blue-500 text-white py-20"
            initial="hidden" 
            animate="visible" 
            variants={fadeInUp}
          >
            <div className="container mx-auto px-4 text-center">
              <motion.h1 className="text-5xl font-extrabold mb-6">
                Welcome to EduTrac
              </motion.h1>
              <motion.p className="text-lg mb-10">
                Manage multiple schools effortlessly with EduTrac.
              </motion.p>
              
              <Button className="bg-white text-blue-600 px-8 py-3 rounded-full shadow-lg hover:bg-blue-100 transition duration-300" text="Get Started" destination="/auth" />
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section 
            className="py-20 bg-gray-50"
            initial="hidden" 
            whileInView="visible" 
            variants={stagger}
            viewport={{ once: true }}
          >
            <div className="container mx-auto px-4">
              <motion.h2 
                className="text-4xl font-bold mb-12 text-center text-gray-900"
                variants={fadeInUp}
              >
                Features
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                {[
                  { title: 'Multi-School Support', description: 'Effortlessly manage multiple schools under one platform.' },
                  { title: 'User Roles', description: 'Assign roles like Admin, Teacher, and Student with ease.' },
                  { title: 'Attendance Management', description: 'Track attendance efficiently and in real-time.' },
                  { title: 'Academic Results', description: 'Generate and manage academic reports.' },
                  { title: 'Email Notifications', description: 'Send timely email alerts to students and staff.' },
                  { title: 'Report Printing', description: 'Print detailed academic and attendance reports.' }
                ].map((feature, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card
                      title={feature.title}
                      description={feature.description}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            className="bg-blue-100 py-20"
            initial="hidden" 
            whileInView="visible" 
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <div className="container mx-auto px-4 text-center">
              <motion.h2 className="text-4xl font-bold mb-8 text-blue-600">
                Ready to Get Started?
              </motion.h2>
              <Button className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300" text="Sign Up Now" />
            </div>
          </motion.section>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
};

export default LandingPage;
