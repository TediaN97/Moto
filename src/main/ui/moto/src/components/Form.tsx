import React, { useState, ChangeEvent, useRef }from 'react';
import Button from './Button';
import InputText from './inputs/InputText';
import InputNumber from './inputs/InputNumber';
import InputSelect from './inputs/InputSelect';
import { createCar, CarData } from '../services/CarService'
import { useNavigate } from 'react-router-dom';

interface FormProps {
    onSelectedImage: (value: boolean) => void;
}

const Form = ( props: FormProps ) => {

  //navigate
  const navigate = useNavigate();

  //useRef
  const fileInputRef = useRef<HTMLInputElement>(null);

  //useState
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [numberValue, setNumberValue] = useState('');
  const [textValue, setTextValue] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [fileValue, setFileValue] = useState<string | undefined >('');

  const [car, setCar] = useState<CarData>({ brand: '', country: '', start_from: '', logo: '' });
  const [numberOfCars, setNumberOfCars] = useState<number>(0);

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
            console.log(selectedValue)
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

   const handleSaveClick = () => {
        createCar({ brand: textValue, country: selectedValue, start_from: numberValue, logo: fileValue })
              .then(response => {
                console.log(response);
                setNumberOfCars(prevNumberOfCars => prevNumberOfCars + 1);
              });

        setCar({ brand: '', country: '', start_from: '', logo: '' });
        handleResetClick();
        navigate('/');
   }

  return (
    <div className="max w-screen bg-purple-300 bg-opacity-20 rounded-tl-full rounded-tr-full p-10 text-purple-600 mt-10 md:max-w-max">
        <InputText name="Brand:" value={textValue} onTextChange={handleTextChange} />
        <InputSelect name="Country:" value={selectedValue} onSelectChange={handleSelectChange} />
        <InputNumber name="Year:" value={numberValue} onNumberChange={handleNumberChange} />
        <input ref={fileInputRef} className="hidden" type="file" onChange={handleImageChange} accept="image/png, image/gif, image/jpeg" />
        {selectedImage ? (
            <div>
                <div className="mt-5 text-2xl lg:text-4xl justify-between flex ">
                        <p className="font-rowdies">Logo:</p>
                        <img className="w-1/3" src={selectedImage} alt="Preview" />
                </div>
                <div className="mt-20 text-2xl flex items-center justify-center">
                    <Button name="Reset" width="w-40" backgroundColor={"bg-purple-600"} hoverBackgroundColor={"bg-purple-900"} onClick={handleResetClick}/>
                    <Button name="Save" width="w-40" backgroundColor={"bg-purple-600"} hoverBackgroundColor={"bg-purple-900"} onClick={handleSaveClick}/>
                </div>
            </div>
         ) : (<div className="mt-10 justify-center flex"><Button name="Select logo" width="w-40" backgroundColor={"bg-purple-600"} hoverBackgroundColor={"bg-purple-900"} onClick={handleClick} /></div>)}
    </div>
  );
}

export default Form;