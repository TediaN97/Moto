import React, { useState, ChangeEvent, useRef }from 'react';
import Button from './Button';
import InputText from './inputs/InputText';
import InputNumber from './inputs/InputNumber';
import InputSelect from './inputs/InputSelect';
import { createModel, updateModel, ErrorResponse } from '../services/ModelService'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface FormModelProps {
    car?: any;
    model?: any;
}

const FormModel: React.FC<FormModelProps> = ({ model, car }) => {

  //navigate
  const navigate = useNavigate();
  //useRef
  const fileInputRef = useRef<HTMLInputElement>(null);

  //useState
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [modelValue, setModelValue] = useState(model?.model?.model ? model?.model?.model : '');
  const [bodyworkValue, setBodyworkValue] = useState(model?.model?.bodywork ? model?.model?.bodywork : '');
  const [classValue, setClassValue] = useState(model?.model?.class ? model?.model?.class : '');
  const [priceValue, setPriceValue] = useState(model?.model?.price ? model?.model?.price : '');
  const [equipmentValue, setEquipmentValue] = useState(model?.model?.equipment ? model?.model?.equipment : []);
  const [lengthValue, setLengthValue] = useState(model?.model?.length ? model?.model?.length : '');
  const [widthValue, setWidthValue] = useState(model?.model?.width ? model?.model?.width : '');
  const [heightValue, setHeightValue] = useState(model?.model?.height ? model?.model?.height : '');
  const [weightValue, setWeightValue] = useState(model?.model?.weight ? model?.model?.weight : '');
  const [filesInput, setFilesInput] = useState<string[]>([]);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>)=> {
      const files = event.target.files;

      if(files){

          const filesArray = Array.from(files);

          const filePromises = filesArray.map(file => {
              return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = () => {
                  resolve(reader.result);
                };

                reader.onerror = reject;
                reader.readAsDataURL(file);
              });
            });

            Promise.all(filePromises)
              .then((results: any) => {
                const split = results.map((result: any) => {
                    return result.toString()?.split(",")[1];
                })
                setFilesInput(split);
                setSelectedImages(results);
              })
              .catch(error => {
                console.error(error);
              });
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
        setModelValue('');
        setBodyworkValue('');
        setClassValue('');
        setPriceValue('');
        setEquipmentValue('');
        setLengthValue('');
        setWidthValue('');
        setHeightValue('');
        setWeightValue('');
        setSelectedImages([]);
    }
    }

   const handleChange = ( value: string, event: string ) => {
        switch (value){
            case "model":
                setModelValue(event);
                break;
            case "bodywork":
                setBodyworkValue(event);
                break;
            case "class":
                setClassValue(event);
                break;
            case "price":
                setPriceValue(event);
                break;
            case "equipment":
                setEquipmentValue(event);
                break;
            case "length":
                setLengthValue(event);
                break;
            case "width":
                setWidthValue(event);
                break;
            case "height":
                setHeightValue(event);
                break;
            case "weight":
                setWeightValue(event);
                break;
            default:
                break;
        }
   }

   const handleSaveClick = async () => {
        if(!model?.model){
            try {
                const response =  await createModel({
                        model: modelValue,
                        bodywork: bodyworkValue,
                        car_class: classValue,
                        price_from: priceValue,
                        equipment: equipmentValue.split(','),
                        car_length: lengthValue,
                        width: widthValue,
                        height: heightValue,
                        weight: weightValue,
                        images: filesInput,
                        car_id: car.id
                });
                if('error' in response) {
                    const errorResponse = response as ErrorResponse;
                }else {
                    handleResetClick();
                    navigate(`/car/models/${car.brand}`);
                }
            } catch(error){

            }
        }else {
           try {
               const response = await updateModel(model?.model?.id,
                          {
                         model: modelValue,
                         bodywork: bodyworkValue,
                         car_class: classValue,
                         price_from: priceValue,
                         equipment: equipmentValue.split(','),
                         car_length: lengthValue,
                         width: widthValue,
                         height: heightValue,
                         weight: weightValue,
                         images: selectedImages,
                         car_id: car.id
               });
               if('error' in response) {
                   const errorResponse = response as ErrorResponse;
                   navigate('/models/');
               }else {
                   handleResetClick();
                   navigate('/');
               }
           } catch(error) {
           }
        }
   }

   const handleRemoveLogo = () => {
        if(fileInputRef.current) fileInputRef.current.value = '';
        setSelectedImages([]);
   }

  return (
    <div className="bg-purple-300 bg-opacity-20 rounded-tl-full rounded-tr-full p-10 text-purple-600 mt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InputText name="Model:" value={modelValue} onTextChange={(event: string) => handleChange("model", event)} />
            <InputSelect name="Bodywork:" value={bodyworkValue} onSelectChange={(event: string) => handleChange("bodywork", event)} options="bodywork" />
            <InputSelect name="Class:" value={classValue} onSelectChange={(event: string) => handleChange("class", event)} options="car_class"/>
            <InputNumber name="Price:" value={priceValue} onNumberChange={(event: string) => handleChange("price", event)} />
            <InputText name="Equipment:" value={equipmentValue} onTextChange={(event: string) => handleChange("equipment", event)} />
            <InputNumber name="Length:" value={lengthValue} onNumberChange={(event: string) => handleChange("length", event)} />
            <InputNumber name="Width:" value={widthValue} onNumberChange={(event: string) => handleChange("width", event)} />
            <InputNumber name="Height:" value={heightValue} onNumberChange={(event: string) => handleChange("height", event)} />
            <InputNumber name="Weight:" value={weightValue} onNumberChange={(event: string) => handleChange("weight", event)} />
            <input ref={fileInputRef} className="hidden" type="file" onChange={handleImageChange} accept="image/png, image/gif, image/jpeg" multiple/>
        </div>
        <div className="mt-10">
            {selectedImages.length ? (
                <div className="mt-5 text-2xl lg:text-4xl">
                    <div className="flex justify-between items-center">
                        <p className="font-rowdies">Images:</p>
                        <FontAwesomeIcon className="ml-4 cursor-pointer" icon={faXmark} onClick={handleRemoveLogo} />
                    </div>
                    <div className="ml-32">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mt-5">
                            {selectedImages.map((image: string, index: number) => <img key={index} className="w-64 h-64" src={image} alt="Preview" />)}
                        </div>
                    </div>
                </div>
            ) : (<div className="flex justify-center items-center"><Button name="Select images" width="w-48" backgroundColor={"bg-purple-600"} hoverBackgroundColor={"hover:bg-purple-900"} onClick={handleClick} /></div>)}
        </div>
        <div className="text-2xl flex items-center justify-center mt-5">
            <Button name="Reset" width="w-40" backgroundColor={"bg-purple-600"} hoverBackgroundColor={"hover:bg-purple-900"} onClick={handleResetClick}/>
            <Button name="Save" width="w-40" backgroundColor={"bg-purple-600"} hoverBackgroundColor={"hover:bg-purple-900"} onClick={handleSaveClick}/>
        </div>
    </div>
  );
}

export default FormModel;