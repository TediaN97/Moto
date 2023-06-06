import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeCompare } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

let Footer = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }

  return (
    <footer className="max h-16 w-full mt-10">
        <div className="ml-10 w-80">
            <ul className="flex justify-between">
                <li className="bg-blue-500 items-center flex p-2 justify-between w-20 whitespace-wrap rounded-3xl" onClick={handleClick} >{
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path
                            d="M9.66671 12.6666H11C11.7364 12.6666 12.3334 12.0697 12.3334 11.3333V5.60522C12.3334 5.18022 12.1308 4.78069 11.7879 4.52956L7.78791 1.59974C7.31885 1.25617 6.68124 1.25617 6.21217 1.59974L2.21217 4.52956C1.86931 4.78069 1.66671 5.18022 1.66671 5.60522V11.3333C1.66671 12.0697 2.26366 12.6666 3.00004 12.6666H4.33337V7.33331C4.33337 6.96512 4.63185 6.66664 5.00004 6.66664H9.00004C9.36823 6.66664 9.66671 6.96512 9.66671 7.33331V12.6666ZM8.33337 12.6666V7.99997H5.66671V12.6666H8.33337ZM1.4243 3.4539L5.4243 0.524081C6.36243 -0.163056 7.63765 -0.163056 8.57578 0.524081L12.5758 3.4539C13.2615 3.95616 13.6667 4.75523 13.6667 5.60522V11.3333C13.6667 12.8061 12.4728 14 11 14H3.00004C1.52728 14 0.333374 12.8061 0.333374 11.3333V5.60522C0.333374 4.75523 0.738579 3.95616 1.4243 3.4539Z" fill="white"/>
                    </svg>
                    } Home
                </li>
                <li className="bg-blue-500 ml-3 items-center flex p-2 justify-center w-20 whitespace-wrap rounded-3xl">
                      {
                         <FontAwesomeIcon icon={faCodeCompare} />
                      }
                </li>
                <li className="bg-blue-500 ml-3 items-center flex p-2 justify-center w-20 whitespace-wrap rounded-3xl">
                      {
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <g opacity="0.5">
                         <path fillRule="evenodd" clipRule="evenodd" d="M17.294 7.29105C17.294 10.2281 14.9391 12.5831 12 12.5831C9.0619 12.5831 6.70601 10.2281 6.70601 7.29105C6.70601 4.35402 9.0619 2 12 2C14.9391 2 17.294 4.35402 17.294 7.29105ZM12 22C7.66237 22 4 21.295 4 18.575C4 15.8539 7.68538 15.1739 12 15.1739C16.3386 15.1739 20 15.8789 20 18.599C20 21.32 16.3146 22 12 22Z" fill="#2F3542"/>
                         </g>
                         </svg>
                      }
                </li>
            </ul>
        </div>
    </footer>
  );
}

export default Footer;
