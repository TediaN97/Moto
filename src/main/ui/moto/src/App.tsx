import React from 'react';
import './App.css';
import CarCreateForm from './pages/CarCreateForm'
import DataProvider from './components/DataProvider'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App(){

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<DataProvider />} />
            <Route path="/car/carForm" element={<CarCreateForm />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
