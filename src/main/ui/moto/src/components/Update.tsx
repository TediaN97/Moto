import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface UpdateProps {
    car: any;
}

const Update = (props: UpdateProps) => {

  const navigate = useNavigate();

  const navigateToNewPage = () => {
    navigate('/car/carForm', { state: { car: props.car } });
  };

  return (
    <FontAwesomeIcon
       icon={faPenToSquare}
       className="absolute top-3 right-14 text-2xl text-purple-800 cursor-pointer bg-white p-2 rounded-xl hover:bg-purple-100"
       onClick={navigateToNewPage}
     />
  );
}

export default Update;