import React from 'react';

const Button = ({ text, onClick, className, destination }) => {
  return (
    <a href={destination} onClick={onClick} className={`inline-block px-8 py-3 rounded-full font-medium text-center ${className}`}>
      {text}
    </a>
  );
};

export default Button;
