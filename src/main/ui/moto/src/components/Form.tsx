import React, { useState, ChangeEvent, useRef }from 'react';
import Button from './Button';
import InputText from './inputs/InputText';
import InputNumber from './inputs/InputNumber';
import InputSelect from './inputs/InputSelect';
import { createCar, CarData, updateCar, ErrorResponse } from '../services/CarService'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface FormProps {
    onSelectedImage: (value: boolean) => void;
    car?: any;
}

const Form = ( props: FormProps ) => {

  //navigate
  const navigate = useNavigate();
  //useRef
  const fileInputRef = useRef<HTMLInputElement>(null);

  //useState
  const [selectedImage, setSelectedImage] = useState<string>(props.car?.car?.logo ? `data:image/png;base64,${props.car?.car?.logo}` : '');
  const [numberValue, setNumberValue] = useState(props.car?.car?.start_from.toString() || '');
  const [textValue, setTextValue] = useState(props.car?.car?.brand || '');
  const [selectedValue, setSelectedValue] = useState(props.car?.car?.country || '');
  const [fileValue, setFileValue] = useState<string | undefined >(props.car?.car?.logo ? props.car?.car?.logo : '');

  const [car, setCar] = useState<CarData>({ brand: '', country: '', start_from: '', logo: '' });

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>)=> {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result as string);
          props.onSelectedImage(true);
          setFileValue(reader.result?.toString()?.split(",")[1]);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleClick = () => {
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }

    const handleResetClick = () => {
        if(fileInputRef.current){
            fileInputRef.current.value = ''
            setSelectedImage('');
            setNumberValue('');
            setTextValue('');
            setSelectedValue('');
            props.onSelectedImage(false);
        }
    }

    const handleNumberChange = (value: string) => {
        setNumberValue(value);
        setCar((prevCar: CarData) => {return {...prevCar, start_from: value }});
    }

    const handleTextChange = (value: string) => {
            setTextValue(value);
            setCar((prevCar: CarData) => {return {...prevCar, brand: value }});
   }

   const handleSelectChange = (value: string) => {
            setSelectedValue(value);
            setCar((prevCar: CarData) => {return {...prevCar, country: value }});
   }

   const handleSaveClick = async () => {
        if(!props.car.car){
            try {
                const response =  await createCar({ brand: textValue, country: selectedValue, start_from: numberValue, logo: fileValue });
                if('error' in response) {
                    const errorResponse = response as ErrorResponse;
                }else {
                    setCar({ brand: '', country: '', start_from: '', logo: '' });
                    handleResetClick();
                    navigate('/');
                }
            } catch(error){

            }
        }else {
           try {
               const response = await updateCar(props.car?.car?.id, { brand: textValue, country: selectedValue, start_from: numberValue, logo: fileValue });
               if('error' in response) {
                   const errorResponse = response as ErrorResponse;
               }else {
                   setCar({ brand: '', country: '', start_from: '', logo: '' });
                   handleResetClick();
                   navigate('/');
               }
           } catch(error) {
           }
        }
   }

   const handleRemoveLogo = () => {
        if(fileInputRef.current) fileInputRef.current.value = '';
        setSelectedImage('');
        setFileValue('')
   }

  return (
    <div className="max w-screen bg-purple-300 bg-opacity-20 rounded-tl-full rounded-tr-full p-10 text-purple-600 mt-10 md:max-w-max">
        <InputText name="Brand:" value={textValue} onTextChange={handleTextChange} />
        <InputSelect name="Country:" value={selectedValue} onSelectChange={handleSelectChange} />
        <InputNumber name="Introduced:" value={numberValue} onNumberChange={handleNumberChange} />
        <input ref={fileInputRef} className="hidden" type="file" onChange={handleImageChange} accept="image/png, image/gif, image/jpeg" />
        {selectedImage ? (
            <div>
                <div className="mt-5 text-2xl lg:text-4xl justify-between flex ">
                        <p className="font-rowdies">Logo:</p>
                        <div className="flex justify-end">
                            <img className="w-1/3" src={selectedImage} alt="Preview" />
                        </div>
                        <FontAwesomeIcon className="ml-4 cursor-pointer" icon={faXmark} onClick={handleRemoveLogo} />
                </div>
                <div className="mt-20 text-2xl flex items-center justify-center">
                    <Button name="Reset" width="w-40" backgroundColor={"bg-purple-600"} hoverBackgroundColor={"hover:bg-purple-900"} onClick={handleResetClick}/>
                    <Button name="Save" width="w-40" backgroundColor={"bg-purple-600"} hoverBackgroundColor={"hover:bg-purple-900"} onClick={handleSaveClick}/>
                </div>
            </div>
         ) : (<div className="mt-10 justify-center flex"><Button name="Select logo" width="w-40" backgroundColor={"bg-purple-600"} hoverBackgroundColor={"hover:bg-purple-900"} onClick={handleClick} /></div>)}
    </div>
  );
}

export default Form;