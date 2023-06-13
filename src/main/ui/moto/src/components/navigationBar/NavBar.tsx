import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
    name: string;
}

const NavBar = (props: NavBarProps) => {

    const navigate = useNavigate();

    const handleClick = (route: string) => {
        navigate(`${route}`)
    }

    return (
    <div>
        <nav className="relative px-4 py-4 flex justify-center items-center lg:justify-center">
            <a className="text-3xl font-bold leading-none cursor-pointer" onClick={() => handleClick('/')}>
                {props.name}
            </a>
            <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
                <li><a className="text-sm text-purple-600 hover:text-purple-900 cursor-pointer" onClick={() => handleClick('/')}>Home</a></li>
                <li className="text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </li>
                <li><a className="text-sm text-purple-600 hover:text-purple-900 cursor-pointer" onClick={() => handleClick('/compare')}>Compare</a></li>
            </ul>
            <a className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-purple-100 text-sm text-purple-600 shadow-lg font-bold  rounded-xl transition duration-200 cursor-pointer" onClick={() => handleClick('/signIn')}>Sign In</a>
            <a className="hidden lg:inline-block py-2 px-6 bg-purple-600 hover:bg-purple-900 text-sm text-white font-bold rounded-xl shadow-lg transition duration-200 cursor-pointer" onClick={() => handleClick('/signUp')}>Sign up</a>
        </nav>
    </div>
    )
}

export default NavBar;