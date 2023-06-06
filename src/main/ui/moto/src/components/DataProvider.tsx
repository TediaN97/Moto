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

            const formCarIndex = sortedData.findIndex((car: any) => car.brand === "carForm");
            if( formCarIndex > -1 ) {
                const movedObj = sortedData.splice(formCarIndex, 1)[0];
                sortedData.push(movedObj);
            }

            setCars(sortedData);
          }
        });
        return () => {
            isCancelled = true;
        }
  }, []);

  return (
        <Home data={cars} />
       );
}

export default DataProvider;