import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Login from '../components/sign/Login';

interface SignUpProps {
    loggedUserInfo: (value: Object ) => void;
    onLogout: (value: any ) => void;
}

const SignUp = (props: SignUpProps) => {

   const [user, setUser] = useState<Array<Object>>([]);

   const handleUserInfo = (value: any) => {
        setUser(value);
        props.loggedUserInfo(value);
   }

   const handleLogout = (value: any) => {
       props.onLogout(value);
   }

  //changeNameTitle
    useEffect(() => {
        document.title = 'SignUp';
      }, []);

  return (
    <div className="h-screen m-0 p-0 box-border flex flex-col font-rowdies font-light bg-purple-100 bg-opacity-30 text-purple-600">
        <Header name="MOTOWIKI" user={user} onLogout={handleLogout}/>
        <span className="text-2xl ml-5 lg:ml-16 mt-10 font-semibold">Sign Up</span>
        <Login loggedUserInfo={handleUserInfo}/>
        <Footer />
    </div>
  );
}

export default SignUp;