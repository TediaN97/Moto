import React, { useState, ChangeEvent} from 'react';

interface InputProps {
    name: String;
    value: string;
    onNumberChange: (value: string) => void;
}

const InputNumber: React.FC<InputProps> = ({name, value, onNumberChange}) => {

  const [isValid, setIsValid] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
       const inputValue = event.target.value;
       if(inputValue.length <= 4) onNumberChange(inputValue);

       const isValidValue = Number(inputValue) >= 1850 && Number(inputValue) <= 2023;
       setIsValid(isValidValue);
  }

  return (
    <div className="mt-5 text-2xl lg:text-4xl font-sans items-center justify-between flex">
        <p className="font-rowdies">{name}</p>
        <input className={`w-1/2 font-rowdies font-light text-black border-4 rounded-2xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none ${isValid ? 'border-purple-900' : value === '' ? 'border-purple-900' : 'border-red-500 ring-red-500 ring-opacity-60'}`} min="1850" max="2023" type="number" value={value} onChange={handleChange} title="Value must be between 1850-2023"/>
    </div>
  );
}

export default InputNumber;