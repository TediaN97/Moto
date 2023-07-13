import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCodeCompare } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

import Li from './navigationBar/Li';
import NavBar from './navigationBar/NavBar'


interface HeaderProps {
  name: string;
  user?: any;
  onLogout: (value: any) => void;
}

const Header = (props: HeaderProps) => {

   const navigate = useNavigate();

    const [textColor, setTextColor] = useState("text-purple-900");
    const [backgroundColor, setBackgroundColor] = useState("white");
    const [activeButtonId, setActiveButtonId] = useState(1);

    const handleClick = (key:number) => {
      setActiveButtonId(key);
      if(key === 1){
          navigate('/');
      }else if(key === 2) {
          navigate('/compare');
      }else if( key === 3 ) {
          navigate('./aboutMe');
      }
    }

    const handleLogout = (value: any) => {
        props.onLogout(value);
    }

  return (
    <header className="max h-30 w-full rounded-bl-3xl rounded-br-3xl">
        <NavBar name={props.name} user={props.user} onLogout={handleLogout}/>
    </header>
  );
}

export default Header;
