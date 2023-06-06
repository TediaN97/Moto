import React from 'react';

interface ButtonProps {
  onClick: () => void;
  name: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, name}) => {
  return (
    <button className="font-rowdies mr-4 text-2xl relative rounded-full font-medium shadow-md bg-light-purple py-2.5 px-5 uppercase text-dark-purple transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-blue-500 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100" onClick={onClick}>
    {name}
    </button>
  );
}

export default Button;