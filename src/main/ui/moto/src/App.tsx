import React, { useState, useEffect }from 'react';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Models from './pages/Models';
import CarCreateForm from './pages/CarCreateForm'
import DataProvider from './components/DataProvider'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App(){

  const [user, setUser] = useState<Array<Object>>([]);

  const handleUserInfo = (value: any) => {
    setUser(value);
  }

  const handleLogout = (value: any) => {
    setUser(value);
  }

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<DataProvider user={user} onLogout={handleLogout} />} />
            <Route path="/car/carForm" element={<CarCreateForm user={user} onLogout={handleLogout} />} />
            <Route path="/signIn" element={<SignIn user={user} onLogout={handleLogout} />} />
            <Route path="/signUp" element={<SignUp loggedUserInfo={handleUserInfo} onLogout={handleLogout} />} />
            <Route path="/car/models/*" element={<Models user={user} onLogout={handleLogout} />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
