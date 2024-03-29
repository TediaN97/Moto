import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Input from "./Input";
import Button from "../Button";
import { register, ErrorResponse } from "../../services/AuthService";
import { useNavigate } from "react-router-dom"

const Register = () => {

  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState<string>("");
  const [lastNameValue, setLastNameValue] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");

 const handleFirstNameChange = (value: string) => {
      setFirstNameValue(value);
      setError(false);
  }

  const handleLastNameChange = (value: string) => {
      setLastNameValue(value);
      setError(false);
   }

   const handleEmailChange = (value: string) => {
      setEmailValue(value);
      setError(false);
   }

   const handlePasswordChange = (value: string) => {
      setPasswordValue(value);
      setError(false);
   }

 const handleRegisterClick = async () => {
        try{
            const response = await register({ firstname: firstNameValue, lastname: lastNameValue, email: emailValue, password: passwordValue, role: "USER" });
            if('error' in response) {
                const errorResponse = response as ErrorResponse;
                setError(true);
            }else {
                navigate('/signIn');
            }
        } catch(error) {
        }
 }


  return(
    <div className="flex-grow items-center justify-center ml-auto mr-auto">
       <div className="w-11/12 ml-4 p-5 mt-10 md:mt-28 bg-purple-200 bg-opacity-40 shadow-xl shadow-purple-700 rounded-3xl lg:max w-full">
            {error && (
               <div className="bg-red-100 border border-red-400 text-red-700 py-3 px-4 rounded relative" role="alert">
                 <span className="flex justify-center items-center">User with this email is already exist.</span>
               </div>
              )}
            <div className="flex">
                <Input name="First name"
                       icon={<svg className={`fill-current text-purple-600`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.294 7.29105C17.294 10.2281 14.9391 12.5831 12 12.5831C9.0619 12.5831 6.70601 10.2281 6.70601 7.29105C6.70601 4.35402 9.0619 2 12 2C14.9391 2 17.294 4.35402 17.294 7.29105ZM12 22C7.66237 22 4 21.295 4 18.575C4 15.8539 7.68538 15.1739 12 15.1739C16.3386 15.1739 20 15.8789 20 18.599C20 21.32 16.3146 22 12 22Z"/>
                            </svg>}
                      placeholder="First..."
                      width="w-1/2"
                      value={firstNameValue}
                      onTextChange={handleFirstNameChange}
                      type="text"
                />
                <Input name="Last name"
                       icon={<svg className={`fill-current text-purple-600`} width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17.294 7.29105C17.294 10.2281 14.9391 12.5831 12 12.5831C9.0619 12.5831 6.70601 10.2281 6.70601 7.29105C6.70601 4.35402 9.0619 2 12 2C14.9391 2 17.294 4.35402 17.294 7.29105ZM12 22C7.66237 22 4 21.295 4 18.575C4 15.8539 7.68538 15.1739 12 15.1739C16.3386 15.1739 20 15.8789 20 18.599C20 21.32 16.3146 22 12 22Z"/>
                             </svg>}
                       placeholder="Last..."
                       width="w-1/2"
                       value={lastNameValue}
                       onTextChange={handleLastNameChange}
                       type="text"
                />
            </div>
            <Input name="Email" icon={<FontAwesomeIcon icon={faEnvelope} />} placeholder="Email..." width="w-full" value={emailValue} onTextChange={handleEmailChange} type="text"/>
            <Input name="Password" icon={<FontAwesomeIcon icon={faLock} />} placeholder="Password..." width="w-full" value={passwordValue} onTextChange={handlePasswordChange} type="password"/>
            <div className="mt-10 flex justify-center items-center">
                <Button name="Sign Up" width="w-40" backgroundColor={"bg-purple-600"} hoverBackgroundColor={"hover:bg-purple-900"} onClick={handleRegisterClick}/>
            </div>
       </div>
    </div>
  )
}

export default Register;