import React, { ChangeEvent } from 'react';

interface Props{
    onSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    value: string;
}

const Select: React.FC<Props> = ({onSelectChange, value}) => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onSelectChange(event);
    };

  return (
    <select
        value={value}
        onChange={handleChange}
        className={`w-1/2 font-rowdies font-light border-purple-900 text-black overflow-scroll border-4 rounded-2xl focus:outline-none focus:border-purple-900`}>
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