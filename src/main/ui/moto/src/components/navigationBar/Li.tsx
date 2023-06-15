import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


interface LiProps {
  name: React.ReactNode;
  backgroundColor: string;
  onClick: () => void;
  isActive: boolean;
}

const Li = (props: LiProps) => {

  return (
    <li className={`${props.isActive ? "bg-purple-800 shadow-purple-800" : "bg-white"} transition-colors shadow-lg ml-3 items-center flex p-2 justify-center w-20 whitespace-wrap rounded-3xl cursor-pointer`} onClick={props.onClick}>
          {
          props.name
          }
    </li>
  );
}

export default Li;