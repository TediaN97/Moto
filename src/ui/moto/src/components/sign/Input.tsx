import React, { ChangeEvent } from 'react';

interface InputProps{
    name: React.ReactNode;
    icon: React.ReactNode;
    placeholder: string;
    width: string;
    value: string;
    onTextChange: (value: string) => void;
    type: string;
}

const Input: React.FC<InputProps>= ({name, icon, placeholder, width, value, onTextChange, type}) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      onTextChange(inputValue);
  }


  return (
     <div className={`${width} px-3 mb-5 h-20" mt-7`}>
         <label className="text-md font-semibold px-1">{name}</label>
         <div className="flex">
             <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                 {icon}
             </div>
             <input type={type} className="w-full h-16 -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-purple-500" value={value} placeholder={placeholder} onChange={handleChange} />
         </div>
     </div>
  )
}

export default Input;