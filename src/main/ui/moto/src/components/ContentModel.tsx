import React, {  useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Slider from './Slider';
import Dropdown from './Dropdown';
import Image from './Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ModelDataContext } from './ModelDataProvider';


interface ContentModelProps {
    searchValue: string;
    filteredCountry: string;
    user: any;
    car: any
}

const ContentModel: React.FC<ContentModelProps> = ({ searchValue, filteredCountry, user, car }) => {

  const models = useContext(ModelDataContext);

  const navigate = useNavigate();

  //hooks
  const [isClickedEdit, setIsClickedEdit] = useState(false);

    const handleAddClick = () => {
        navigate('/car/models/modelCreateForm', { state: { car } });
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
            <p className="text-xl font-bold" >Models {car.brand}</p>
            {user.role === "ADMIN" && (
                <div className="flex ">
                    <Button name="Add model" onClick={handleAddClick} isResponsiveButton={true}/>
                    {isClickedEdit ? <Button name={<FontAwesomeIcon className="text-2xl" icon={faCircleXmark} />} shadowColor={"purple-800"} backgroundColor={"bg-purple-800"} onClick={toggleEditButton} isResponsiveButton={true} /> : <Button name="Edit" onClick={toggleEditButton} isResponsiveButton={true} />}
                    <Dropdown onChangeEdit={handleChangeEdit} />
                </div>
            )}
       </div>
       {models.length !== 0 && (
            <div className="min-w-sm cursor-pointer">
               {models.map((model) => {
                    console.log(model);
                       return (
                       <div key={model?.id}>

                       </div>
                     )})}
            </div>
        )}
    </div>
  );
}

export default ContentModel;