import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Register from '../components/sign/Register';

const SignIn = () => {

  //changeNameTitle
    useEffect(() => {
        document.title = 'SignIn';
      }, []);

  return (
    <div className="h-screen m-0 p-0 box-border flex flex-col font-rowdies font-light bg-purple-100 bg-opacity-30 text-purple-600">
        <Header name="MOTOWIKI"/>
        <span className="text-2xl ml-5 lg:ml-16 mt-10 font-semibold">Sign In</span>
        <Register />
        <Footer />
    </div>
  );
}

export default SignIn;