import React, { useState, useEffect } from 'react';
import { getAllCars } from '../services/CarService';
import Home from '../pages/Home';

function DataProvider(){
  const [cars, setCars] = useState<Array<Object>>([]);

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
        <Home data={cars}/>
       );
}

export default DataProvider;