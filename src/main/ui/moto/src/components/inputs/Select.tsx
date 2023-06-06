import React, { ChangeEvent } from 'react';

interface Props{
    onSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

const Select: React.FC<Props> = ({onSelectChange, value}) => {

  return (
    <select value={value} onChange={onSelectChange} className="font-rowdies font-light border-blue-500 text-black border-4 rounded-2xl focus:ring  focus:outline-none focus:border-blue-500">
        <option value=""></option>
        <option value="Australia">Australia</option>
        <option value="Brazil">Brazil</option>
        <option value="China">China</option>
        <option value="Czechia">Czechia</option>
        <option value="France">France</option>
        <option value="Germany">Germany</option>
        <option value="India">India</option>
        <option value="Italy">Italy</option>
        <option value="Japan">Japan</option>
        <option value="Russia">Russia</option>
        <option value="South Korea">South Korea</option>
        <option value="Spain">Spain</option>
        <option value="Sweden">Sweden</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="United States">United States</option>
    </select>
  );
}

export default Select;