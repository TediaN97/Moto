import React, { useState, useEffect } from 'react';
import { getAllCars } from '../services/CarService';
import { getUserInfo } from '../services/AuthService';
import Home from '../pages/Home';

interface DataProviderProps {
    user: any;
    onLogout: (value: any ) => void;
}

function DataProvider(props: DataProviderProps){
  const [cars, setCars] = useState<Array<Object>>([]);

  const handleLogout = (value: any ) => {
    props.onLogout(value);
  }


  useEffect(() => {
       let isCancelled = false;
       getAllCars()
        .then(data => {
          if(!isCancelled) {
            const sortedData = data.sort((a: any, b: any) => a.brand.localeCompare(b.brand));

            setCars(sortedData);
          }
        });
        return () => {
            isCancelled = true;
        }
  }, [cars]);

  return (
        <Home data={cars} user={props.user} onLogout={handleLogout}/>
       );
}

export default DataProvider;