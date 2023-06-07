import React, { MouseEvent } from 'react';

interface FilteredButtonProps {
  onClick: (event: any) => void;
  name: string;
  isActive: boolean;
}

const FilteredButton: React.FC<FilteredButtonProps> = ({ onClick, name, isActive }) => {

  return (
    <button
       name={name}
       className={`whitespace-nowrap font-rowdies p-4 mr-4 text-md rounded-3xl font-light shadow-sm ${isActive ? "border-green-400 border-2 bg-green-400 bg-opacity-20 text-green-500" : "bg-white"}`}
       onClick={onClick}
    >
        {name}
    </button>
  )
}

export default FilteredButton;