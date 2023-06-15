import React, { ChangeEvent, useState } from 'react';

interface InputProps {
    name: String;
    value: string;
    onTextChange: (value: string) => void;
}

const InputText: React.FC<InputProps> = ({name, value, onTextChange}) => {


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    onTextChange(inputValue);
  }

  return (
    <div className="mt-5 text-2xl lg:text-4xl font-sans items-center justify-between flex">
        <p className="font-rowdies">{name}</p>
        <input
            className="font-rowdies font-light text-black border-purple-900 border-4 rounded-2xl focus:outline-none w-1/2"
            maxLength={50}
            value={value}
            onChange={handleChange}
            type="text"
        />
    </div>
  );
}

export default InputText;