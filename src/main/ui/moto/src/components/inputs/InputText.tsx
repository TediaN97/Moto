import React, { ChangeEvent } from 'react';

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
    <div className="mt-5 text-4xl font-sans items-center justify-between flex">
        <p className="font-rowdies">{name}</p>
        <input
            className="font-rowdies font-light text-black border-blue-500 border-4 rounded-2xl focus:ring  focus:outline-none focus:border-blue-500 w-3/5"
            maxLength={50}
            value={value}
            onChange={handleChange}
            type="text"
        />
    </div>
  );
}

export default InputText;