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
            className={`${props.isClickedEdit ? "border-2 rounded-3xl border-purple-900 shadow-lg h-80 w-full " : "border-2 border-solid border-purple-900 border-solid h-80 w-80 object-fill rounded-3xl lg:w-80 lg:hover:h-96 lg:hover:w-96 lg:hover:animate-pulse transition-all duration-700 mr-3 lg:mr-9 xl:mr-8"}`}
            src={`data:image/png;base64,${props.imageData}`}
            alt="logo"
            draggable="false"
        />
    )
}

export default ImageComponent;