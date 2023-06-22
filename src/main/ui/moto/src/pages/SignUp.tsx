import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../components/sign/Login';


const SignUp = () => {

  //changeNameTitle
    useEffect(() => {
        document.title = 'SignUp';
      }, []);

  return (
    <div className="h-screen m-0 p-0 box-border flex flex-col font-rowdies font-light bg-purple-100 bg-opacity-30 text-purple-600">
        <Header name="MOTOWIKI"/>
        <span className="text-2xl ml-5 lg:ml-16 mt-10 font-semibold">Sign Up</span>
        <Login />
        <Footer />
    </div>
  );
}

export default SignUp;