import React from 'react';

const Card = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
      <div className="text-4xl mb-4">{icon}</div> {/* Use icons if needed */}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;
