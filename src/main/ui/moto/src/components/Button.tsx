import React, { MouseEvent } from 'react';

interface ButtonProps {
  onClick: () => void;
  name: React.ReactNode;
  backgroundColor?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, name, backgroundColor }) => {
  return (
    <button className={`font-rowdies mr-4 text-2xl relative rounded-full font-medium shadow-lg shadow-${backgroundColor} bg-${backgroundColor} uppercase transition-colors w-16 items-center justify-center flex`} onClick={onClick}>
    {name}
    </button>
  );
}

export default Button;