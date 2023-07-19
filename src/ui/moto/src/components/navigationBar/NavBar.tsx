import React, { useState, ChangeEvent, useEffect } from 'react';
import { getUserInfo, UserData, logout } from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
    name: string;
    user: any;
    onLogout: (value: any) => void;
}

const NavBar = (props: NavBarProps) => {
    const navigate = useNavigate();

    const [user, setUser] = useState<Array<Object>>(props.user);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = (route: string) => {
        navigate(`${route}`)
    }

    const handleLogoutClick = () => {
        logout();
        setUser([]);
        props.onLogout([]);
    }

    useEffect(() => {
        const handleClick = () => {
          const menu = document.querySelectorAll('.navbar-menu');

          for (let j = 0; j < menu.length; j++) {
            menu[j].classList.toggle('hidden');
          }
        };

        const burger = document.querySelectorAll('.navbar-burger');
        const close = document.querySelectorAll('.navbar-close');
        const backdrop = document.querySelectorAll('.navbar-backdrop');

        if (burger.length && close.length && backdrop.length) {
          for (let i = 0; i < burger.length; i++) {
            burger[i].addEventListener('click', handleClick);
          }

          for (let i = 0; i < close.length; i++) {
            close[i].addEventListener('click', handleClick);
          }

          for (let i = 0; i < backdrop.length; i++) {
            backdrop[i].addEventListener('click', handleClick);
          }
        }

        return () => {
          if (burger.length && close.length && backdrop.length) {
            for (let i = 0; i < burger.length; i++) {
              burger[i].removeEventListener('click', handleClick);
            }

            for (let i = 0; i < close.length; i++) {
              close[i].removeEventListener('click', handleClick);
            }

            for (let i = 0; i < backdrop.length; i++) {
              backdrop[i].removeEventListener('click', handleClick);
            }
          }
        };
      }, []);


    return (
    <div>
        <nav className="relative px-4 py-4 flex justify-between items-center lg:justify-center">
            <a className="ml-3 text-3xl font-bold leading-none cursor-pointer" onClick={() => handleClick('/')}>
                {props.name}
            </a>
            <div className="lg:hidden">
                <button className="navbar-burger flex items-center text-purple-600 p-3 mr-7">
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                   </svg>
                </button>
            </div>
            <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
                <li><a className="text-sm text-purple-600 hover:text-purple-900 cursor-pointer" onClick={() => handleClick('/')}>Home</a></li>
                <li className="text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" className="w-4 h-4 current-fill" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </li>
                <li><a className="text-sm text-purple-600 hover:text-purple-900 cursor-pointer" onClick={() => handleClick('/compare')}>Compare</a></li>
            </ul>
            {user.length === 0 && (
                <>
                    <a className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-purple-100 text-sm text-purple-600 shadow-lg font-bold  rounded-xl transition duration-200 cursor-pointer" onClick={() => handleClick('/signUp')}>Sign Up</a>
                    <a className="hidden lg:inline-block py-2 px-6 bg-purple-600 hover:bg-purple-900 text-sm text-white font-bold rounded-xl shadow-lg transition duration-200 cursor-pointer" onClick={() => handleClick('/signIn')}>Sign In</a>
                </>
            )
            }
            {user.length !== 0 && (
                <a className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-purple-600 hover:text-white text-sm text-purple-600 shadow-lg font-bold  rounded-xl transition duration-200 cursor-pointer" onClick={handleLogoutClick}>Logout</a>
            )}
        </nav>
        <div className="navbar-menu relative z-50 hidden">
            <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
            <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-purple-50 border-r overflow-y-auto">
                <div className="flex items-center mb-8">
                    <a className="mr-auto text-3xl font-bold leading-none" href="/">
                        {props.name}
                    </a>
                    <button className="navbar-close">
                        <svg className="h-6 w-6 text-purple-400 cursor-pointer hover:text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div>
                    {user.length === 0 && (
                        <div className="pt-6">
                            <a className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-white hover:bg-purple-200 rounded-xl transition duration-200 cursor-pointer" onClick={() => handleClick('/signUp')} >Sign Up</a>
                            <a className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-purple-600 hover:bg-purple-900  rounded-xl shadow-lg transition duration-200 cursor-pointer" onClick={() => handleClick('/signIn')}>Sign In</a>
                        </div>
                    )}
                    {user.length !== 0 && (
                        <a className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 shadow-lg hover:bg-purple-600 hover:text-white text-sm text-purple-600 rounded-xl transition duration-200 cursor-pointer" onClick={handleLogoutClick}>Logout</a>
                    )}
                </div>
            </nav>
        </div>
    </div>
    )
}

export default NavBar;