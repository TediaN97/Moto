import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FormModel from '../components/FormModel';
import { useNavigate, useLocation } from 'react-router-dom';

interface ModelCreateFormProps {
    user: any;
    onLogout: (value: any) => void;
}

function ModelCreateForm(props: ModelCreateFormProps){

  const [isSelected, setIsSelected] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  let model = {};
  let car = location.state.car;

  if(location.state?.model){
    model = location.state.model;
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

  const handleLogout = (value: any ) => {
     props.onLogout(value);
  }

 //changeNameTitle
 useEffect(() => {
     const titleElement = document.querySelector('title');
         if (titleElement) {
           titleElement.innerHTML = 'Model From';
         }
   }, []);

  return (
    <div className="m-0 p-0 box-border flex flex-col font-rowdies font-light bg-purple-100 bg-opacity-30 text-purple-600">
        <Header name="MOTOWIKI" user={props.user} onLogout={handleLogout}/>
        <span className="text-2xl ml-5 lg:ml-16 mt-10 font-semibold">Model Form</span>
        <div className="flex-grow items-center justify-center ml-auto mr-auto">
            <FormModel model={model} car={car} />
        </div>
        <Footer homeIsNotActive={true} />
    </div>
  );
}

export default ModelCreateForm;