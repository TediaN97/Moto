import React from 'react';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CarCreateForm from './pages/CarCreateForm'
import DataProvider from './components/DataProvider'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App(){

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<DataProvider />} />
            <Route path="/car/carForm" element={<CarCreateForm />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
