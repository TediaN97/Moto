import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => {

  const handleClick = () => {

  }

  return (
    <header className="max h-30 w-full rounded-bl-3xl rounded-br-3xl">
        <div className="text-purple-900 text-center font-rowdies font-semibold justify-center tracking-wider pt-10 pb-10 pr-9 pl-7 flex">
            <p className="text-4xl">{props.name}</p>
        </div>
    </header>
  );
}

export default Header;
