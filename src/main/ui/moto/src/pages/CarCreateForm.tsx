import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Form from '../components/Form';
import { useNavigate } from 'react-router-dom';


function CarCreateForm(){

  const navigate = useNavigate();

  const handleHomeClick = () => {
        navigate('/');
  }

  const handleFormClick = () => {
        navigate('/car/carForm');
  }

  return (
    <div className="m-0 p-0 box-border flex flex-col min-h-screen bg-green-100">
        <Header name="CAR FORM" />
        <div className="flex ">
            <p onClick={handleHomeClick} className="mt-6 ml-10 text-lg font-rowdies font-light">Home </p>
            <p className="mt-6 ml-2 text-lg font-rowdies font-light">{"->"}</p>
            <p onClick={handleFormClick} className="mt-6 ml-2 text-lg font-rowdies font-light">Car_form</p>
        </div>
        <div className="flex-grow items-center justify-center mt-10 m-auto">
            <Form />
        </div>
        <Footer/>
    </div>
  );
}

export default CarCreateForm;