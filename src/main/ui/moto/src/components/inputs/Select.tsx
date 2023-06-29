import React, { ChangeEvent } from 'react';

interface Props{
    onSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    options: string;
}

const Select: React.FC<Props> = ({onSelectChange, value, options}) => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onSelectChange(event);
    };

  return (
    <>
        {options === "country" && (
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
        )}
        {options === "bodywork" && (
            <select
                value={value}
                onChange={handleChange}
                className={`w-1/2 font-rowdies font-light border-purple-900 text-black overflow-scroll border-4 rounded-2xl focus:outline-none focus:border-purple-900`}>
                <option value=""></option>
                <option value="Cabriolet">Cabriolet</option>
                <option value="Combi">Combi</option>
                <option value="Coupe">Coupe</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Limusine">Limusine</option>
                <option value="Liftback">Liftback</option>
                <option value="Pickup">Pickup</option>
                <option value="Roadster">Roadster</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Van">Van</option>
            </select>
        )}
        {options === "car_class" && (
            <select
                value={value}
                onChange={handleChange}
                className={`w-1/2 font-rowdies font-light border-purple-900 text-black overflow-scroll border-4 rounded-2xl focus:outline-none focus:border-purple-900`}>
                <option value=""></option>
                <option value="Lower">Lower</option>
                <option value="Lower Middle">Lower Middle</option>
                <option value="Luxury">Luxury</option>
                <option value="Middle">Middle</option>
                <option value="Mini">Mini</option>
                <option value="Sport">Sport</option>
                <option value="Supersport">Supersport</option>
                <option value="Upper Middle">Upper Middle</option>
            </select>
        )}
    </>
  );
}

export default Select;