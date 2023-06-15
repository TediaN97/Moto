import React from 'react';

interface ButtonProps {
  onClick: () => void;
  name: React.ReactNode;
  backgroundColor?: string;
  isResponsiveButton?: boolean;
  hoverBackgroundColor?: string;
  shadowColor?: string;
  hidden?: boolean;
  width?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, name, backgroundColor, isResponsiveButton, hoverBackgroundColor, shadowColor, hidden, width}) => {

  return (
    <button className={`${width ? width : "w-20"} ${backgroundColor ? backgroundColor+" text-white "+hoverBackgroundColor : "white hover:bg-purple-100"} whitespace-nowrap w-20 h-12 font-rowdies mr-4 text-lg relative rounded-xl font-medium shadow-lg shadow-${shadowColor} uppercase transition-colors w-16 items-center justify-center ${isResponsiveButton ? "h-12 w-44 hidden lg:flex lg:mr-4" : "flex"} ${hidden ? "lg:hidden" : "inline-block"}`} onClick={onClick}>
    {name}
    </button>
  );
}

export default Button;