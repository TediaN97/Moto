import React, { MouseEvent } from 'react';

interface ButtonProps {
  onClick: () => void;
  name: React.ReactNode;
  backgroundColor?: string;
  isResponsiveButton?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, name, backgroundColor, isResponsiveButton }) => {
  return (
    <button className={`whitespace-nowrap font-rowdies mr-4 text-lg relative rounded-xl font-medium shadow-lg shadow-${backgroundColor} bg-${backgroundColor ? backgroundColor : "white hover:bg-purple-100"} uppercase transition-colors w-16 items-center justify-center ${isResponsiveButton ? "h-12 w-44 hidden lg:flex lg:mr-4" : "flex"}`} onClick={onClick}>
    {name}
    </button>
  );
}

export default Button;