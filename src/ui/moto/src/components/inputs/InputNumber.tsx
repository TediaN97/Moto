import React, { useState, ChangeEvent} from 'react';

interface InputProps {
    name: String;
    value: string;
    onNumberChange: (value: string) => void;
    introduced?: boolean
}

const InputNumber: React.FC<InputProps> = ({name, value, onNumberChange, introduced}) => {

  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
       const inputValue = event.target.value;
       if(introduced && inputValue.length <= 4){
            onNumberChange(inputValue);
            const isValidValue = Number(inputValue) >= 1850 && Number(inputValue) <= 2023;
            setIsValid(isValidValue);
       } else if(!introduced && inputValue.length <= 7){
            onNumberChange(inputValue);
       }

  }

  return (
    <div className="mt-5 text-2xl lg:text-4xl font-sans items-center justify-between flex">
        <p className="font-rowdies">{name}</p>
        {introduced ? (
            <input className={`w-1/2 font-rowdies font-light text-black border-4 rounded-2xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none ${isValid && value.length === 4 ? 'border-purple-900' : value === '' ? 'border-purple-900' : 'border-red-500 ring-red-500 ring-opacity-60'}`} min="1850" max="2023" type="number" value={value} onChange={handleChange} title="Value must be between 1850-2023"/>
        ) : (<input className={`w-1/2 font-rowdies font-light text-black border-4 rounded-2xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none ${value.includes('-') ? 'border-red-500 ring-red-500 ring-opacity-60' : 'border-purple-900'}`} type="number" value={value} onChange={handleChange} />)}
    </div>
  );
}

export default InputNumber;