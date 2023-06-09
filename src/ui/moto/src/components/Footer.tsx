import React, { useState } from 'react';

import Li from './navigationBar/Li';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeCompare } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

interface FooterProps {
    isSelected?: boolean;
    homeIsNotActive?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isSelected, homeIsNotActive }) => {

  const navigate = useNavigate();
  const [textColor, setTextColor] = useState("text-purple-900");
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [activeButtonId, setActiveButtonId] = useState(homeIsNotActive ? 0 : 1);

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

  return (
    <footer className={`static max h-16 mt-10 w-full flex justify-center items-center `}>
        <div className="w-80">
            <span className="hidden lg:flex text-sm ml-8">Created by <a className="mr-1 ml-1" href="https://www.linkedin.com/in/mat%C3%BA%C5%A1-sabat-571002118/">Ing.Matúš Sabat</a> © 2023</span>
            <ul className="flex justify-between lg:hidden">
                <Li key={1} name={
                    <svg className={`fill-current ${activeButtonId === 1 ? "text-white" : "text-purple-900"}`} width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M9.66671 12.6666H11C11.7364 12.6666 12.3334 12.0697 12.3334 11.3333V5.60522C12.3334 5.18022 12.1308 4.78069 11.7879 4.52956L7.78791 1.59974C7.31885 1.25617 6.68124 1.25617 6.21217 1.59974L2.21217 4.52956C1.86931 4.78069 1.66671 5.18022 1.66671 5.60522V11.3333C1.66671 12.0697 2.26366 12.6666 3.00004 12.6666H4.33337V7.33331C4.33337 6.96512 4.63185 6.66664 5.00004 6.66664H9.00004C9.36823 6.66664 9.66671 6.96512 9.66671 7.33331V12.6666ZM8.33337 12.6666V7.99997H5.66671V12.6666H8.33337ZM1.4243 3.4539L5.4243 0.524081C6.36243 -0.163056 7.63765 -0.163056 8.57578 0.524081L12.5758 3.4539C13.2615 3.95616 13.6667 4.75523 13.6667 5.60522V11.3333C13.6667 12.8061 12.4728 14 11 14H3.00004C1.52728 14 0.333374 12.8061 0.333374 11.3333V5.60522C0.333374 4.75523 0.738579 3.95616 1.4243 3.4539Z"/>
                      </svg>
                      }
                 backgroundColor={backgroundColor} onClick={() => handleClick(1)} isActive={activeButtonId === 1}/>
                <Li key={2} name={ <FontAwesomeIcon className={`${activeButtonId === 2 ? "text-white" : "text-purple-900"}`} icon={faCodeCompare} />}backgroundColor={backgroundColor} onClick={() => handleClick(2)} isActive={activeButtonId === 2}/>
                <Li key={3} name={
                       <svg className={`fill-current ${activeButtonId === 3 ? "text-white" : "text-purple-900"}`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M17.294 7.29105C17.294 10.2281 14.9391 12.5831 12 12.5831C9.0619 12.5831 6.70601 10.2281 6.70601 7.29105C6.70601 4.35402 9.0619 2 12 2C14.9391 2 17.294 4.35402 17.294 7.29105ZM12 22C7.66237 22 4 21.295 4 18.575C4 15.8539 7.68538 15.1739 12 15.1739C16.3386 15.1739 20 15.8789 20 18.599C20 21.32 16.3146 22 12 22Z"/>
                       </svg>}
                   backgroundColor={backgroundColor}
                   onClick={() => handleClick(3)}
                   isActive={activeButtonId === 3}
                 />
            </ul>
        </div>
    </footer>
  );
}

export default Footer;
