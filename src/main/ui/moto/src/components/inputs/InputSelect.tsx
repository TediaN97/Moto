import React, { ChangeEvent, useState } from 'react';
import Select from './Select';

interface SelectProps {
    name: String;
    onSelectChange: (value: string) => void;
    value: string;
}

const InputSelect: React.FC<SelectProps> = ({name, value, onSelectChange}) => {

  const [inputValue, setInputValue ] = useState('');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const inputValue = event.target.value;
    onSelectChange(inputValue);
  }

  return (
    <div className="mt-5 text-2xl lg:text-4xl items-center justify-between flex">
        <p className="font-rowdies">{name}</p>
        <Select value={value} onSelectChange={handleChange} />
    </div>
  );
}

export default InputSelect;