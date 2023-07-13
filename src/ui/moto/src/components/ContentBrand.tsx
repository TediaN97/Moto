import React, {  useState } from 'react';

import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Slider from './Slider';
import Grid from './Grid';
import Dropdown from './Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';


interface ContentBrandProps {
    data: any;
    searchValue: string;
    filteredCountry: string;
    user: any;
}

const ContentBrand: React.FC<ContentBrandProps> = ({ data, searchValue, filteredCountry, user }) => {

  const navigate = useNavigate();

  //hooks
  const [isClickedEdit, setIsClickedEdit] = useState(false);

    const handleAddClick = () => {
        navigate('/car/carForm');
    }

    const toggleEditButton = () => {
        setIsClickedEdit(!isClickedEdit);
    }

    const handleChangeEdit = (value: boolean) => {
        setIsClickedEdit(value);
    }
  return (
    <div>
        <div className="ml-7 mt-10 flex justify-between items-center">
            <p className="text-xl font-bold" >Brands</p>
            {user.role === "ADMIN" && (
                <div className="flex ">
                    <Button name="Add brand" onClick={handleAddClick} isResponsiveButton={true} />
                    {isClickedEdit ? <Button name={<FontAwesomeIcon className="text-2xl" icon={faCircleXmark} />} shadowColor={"purple-800"} backgroundColor={"bg-purple-800"} onClick={toggleEditButton} isResponsiveButton={true} /> : <Button name="Edit" onClick={toggleEditButton} isResponsiveButton={true} />}
                    <Dropdown onChangeEdit={handleChangeEdit} />
                </div>
            )}
       </div>
        <div className="min-w-sm cursor-pointer">
           <Grid isClickedEdit={isClickedEdit} data={data} filteredCountry={filteredCountry} searchValue={searchValue} />
           <Slider isClickedEdit={isClickedEdit} data={data} filteredCountry={filteredCountry} searchValue={searchValue}/>
        </div>
    </div>
  );
}

export default ContentBrand;