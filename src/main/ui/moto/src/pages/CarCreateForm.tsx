import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Form from '../components/Form';
import { useNavigate, useLocation } from 'react-router-dom';


function CarCreateForm(){

  const [isSelected, setIsSelected] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  let car = {};

  if(location.state){
     car = location.state;
  }


  const handleHomeClick = () => {
        navigate('/');
  }

  const handleFormClick = () => {
        navigate('/car/carForm');
  }

  const handleSelectedImage = (value: boolean) => {
       setIsSelected(value);
  }

 //changeNameTitle
 useEffect(() => {
     const titleElement = document.querySelector('title');
         if (titleElement) {
           titleElement.innerHTML = 'Car From';
         }
   }, []);

  return (
    <div className="h-screen w-screen m-0 p-0 box-border flex flex-col font-rowdies font-light bg-purple-100 bg-opacity-30 text-purple-600">
        <Header name="MOTOWIKI" />
        <span className="text-2xl ml-5 lg:ml-16 mt-10 font-semibold">Car Form</span>
        <div className="flex-grow items-center justify-center ml-auto mr-auto">
            <Form onSelectedImage={handleSelectedImage} car={car} />
        </div>
        <Footer isSelected={isSelected} homeIsNotActive={true} />
    </div>
  );
}

export default CarCreateForm;