import React from 'react';

const Header = () => {
  return (
    <header className="bg-white py-4 shadow-md fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">EduTrac</div>
        <nav className="space-x-6">
          <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
          <a href="#pricing" className="text-gray-700 hover:text-blue-600">Pricing</a>
          <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
