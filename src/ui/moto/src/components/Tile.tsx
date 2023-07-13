import React from 'react';
import { useNavigate } from 'react-router-dom';


interface TileProps {
    data: any
}

const Tile = (props: TileProps) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`car/models/${props.data.car.brand}/${props.data.model}`);
  }

  return (
        <div>
        </div>
    )
}

export default Tile;