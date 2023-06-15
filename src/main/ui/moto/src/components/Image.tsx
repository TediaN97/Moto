import React from 'react';
import { useNavigate } from 'react-router-dom';


interface ImageProps {
    imageData: string;
    brand: string;
    isClickedEdit?: boolean
}

const ImageComponent = (props: ImageProps) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`car/${props.brand}`)
  }

  return (
        <img
            onClick={handleClick}
            className={`${props.isClickedEdit ? "border-2 rounded-3xl border-purple-900 shadow-lg h-96 block w-full h-auto" : "h-96 w-10/12 object-fill rounded-3xl sm:w-1/2 lg:w-1/4 2xl:w-1/4 lg:hover:w-1/4 lg:hover:h-1/4  lg:border-purple-900 border-2 2xl:w-96 mr-4"}`}
            src={`data:image/png;base64,${props.imageData}`}
            alt="logo"
            draggable="false"
        />
    )
}

export default ImageComponent;