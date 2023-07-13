import React, { useRef, useState, useEffect }from 'react';

import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface DropdownProps {
    onChangeEdit: (value: boolean) => void;
}

const Dropdown = (props: DropdownProps) => {

   //navigate
   const navigate = useNavigate();

   //references
     const dropdownRef = useRef<HTMLDivElement>(null);

   //hooks
   const [isOpen, setIsOpen] = useState(false);
   const [bgColor, setBgColor] = useState("white hover:bg-purple-100");
   const [shadowColor, setShadowColor] = useState("white hover:bg-purple-100");
   const [textColor, setTextColor] = useState("text-purple-600");
   const [clickedEdit, setClickedEdit] = useState(true);

   useEffect(() => {
       const handleOutsideClick = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
           setIsOpen(false);
           setBgColor('white hover:bg-purple-100');
           setShadowColor("white hover:bg-purple-100");
           setTextColor("text-purple-600");
         }
       };

       document.addEventListener('click', handleOutsideClick);

       return () => {
         document.removeEventListener('click', handleOutsideClick);
       };
     }, []);

   const handleOpenWindow = () => {
      setIsOpen(!isOpen);
      !isOpen ? setBgColor("bg-purple-800") : setBgColor("white hover:bg-purple-100");
      !isOpen ? setShadowColor("purple-800") : setShadowColor("white hover:bg-purple-100");
      !isOpen ? setTextColor("text-white") : setTextColor("text-purple-600");
  }

   const handleClickEdit = async () => {
        setClickedEdit(!clickedEdit);
        props.onChangeEdit(clickedEdit);
        setIsOpen(false);
   }

  return(
        <div className="mr-2" ref={dropdownRef}>
            <Button name={<FontAwesomeIcon className={textColor} icon={faEllipsisVertical} />} backgroundColor={bgColor} shadowColor={shadowColor} onClick={handleOpenWindow} hidden={true} />
            {isOpen && (
                <div className="absolute right-5 top-80 w-32 p-4 rounded-xl bg-white border border-solid border-purple-900 z-20">
                    <ul className="flex flex-col gap-4">
                       <li className="hover:bg-purple-100" onClick={() => navigate('/car/carForm')}>Add Brand</li>
                       {clickedEdit ? <li className="hover:bg-purple-100" onClick={handleClickEdit}>Edit</li> : <li className="bg-purple-800 text-white" onClick={handleClickEdit}>Stop editing</li>}
                    </ul>
               </div>
            )}
        </div>
      )
}

export default Dropdown;