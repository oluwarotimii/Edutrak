import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8 mt-20">
      <div className="container mx-auto text-center">
        <p className="text-sm">© {new Date().getFullYear()} EduTrac. All rights reserved.</p>
        <div className="mt-4">
          <a href="#features" className="mr-4 hover:underline">Features</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
