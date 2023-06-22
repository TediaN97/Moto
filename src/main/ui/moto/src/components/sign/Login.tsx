import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import Input from "./Input";
import Button from "../Button";
import { authentication, ErrorResponse } from "../../services/AuthService";
import { useNavigate } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");


  const handleEmailChange = (value: string) => {
      setEmailValue(value);
      setError(false);
  }

  const handlePasswordChange = (value: string) => {
     setPasswordValue(value);
     setError(false);
  }

  const handleLoginClick = async () => {
    try {
        const response = await authentication({ email: emailValue, password: passwordValue });
        if('error' in response) {
            const errorResponse = response as ErrorResponse;
            setError(true);
        }else {
            const token = response.token;
            localStorage.token = token;
            navigate('/');
        }
    } catch(error) {
    }
  }



  return(
    <div className="flex-grow items-center justify-center ml-auto mr-auto">
       <div className="max w-full px-10 py-10 mt-16 md:mt-28 bg-purple-200 bg-opacity-40 shadow-xl shadow-purple-700 rounded-3xl">
            {error && (
               <div className="bg-red-100 border border-red-400 text-red-700 py-3 px-4 rounded relative" role="alert">
                 <span className="block sm:inline">That email and password combination is incorrect.</span>
               </div>
              )}
            <Input name="Email" icon={<FontAwesomeIcon icon={faEnvelope} />} placeholder="Email..." width="w-full" value={emailValue} onTextChange={handleEmailChange} type="text"/>
            <Input name="Password" icon={<FontAwesomeIcon icon={faLock} />} placeholder="Password..." width="w-full" value={passwordValue} onTextChange={handlePasswordChange} type="password"/>
            <div className="text-right mr-3 text-purple-600 hover:underline hover:text-purple-900">
                <a href="#">Forgot your password?</a>
            </div>
            <div className="mt-10 flex justify-center items-center">
                <Button name="Sign Up" width="w-40" backgroundColor={"bg-purple-600"} hoverBackgroundColor={"hover:bg-purple-900"} onClick={handleLoginClick}/>
            </div>
            <div className="text-center mr-3 text-purple-600 mt-2">
                No account? <a className="hover:underline hover:text-purple-900 cursor-pointer" onClick={() => navigate('/signIn')}>Create one</a>
            </div>
       </div>
    </div>
  )
}

export default Login;