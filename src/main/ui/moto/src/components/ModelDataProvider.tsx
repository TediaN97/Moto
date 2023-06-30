import React, { useState, useEffect } from 'react';
import { getAllModels } from '../services/ModelService';
import { getUserInfo } from '../services/AuthService';
import Home from '../pages/Home';

interface ModelDataProviderProps {
  car: any;
  children: React.ReactNode;
}

export const ModelDataContext = React.createContext<Array<Object>>([]);

const ModelDataProvider: React.FC<ModelDataProviderProps> = ({ children, car }) => {

  const [models, setModels] = useState<Array<Object>>([]);

  useEffect(() => {
       let isCancelled = false;
       if(car.length !== 0){
           getAllModels(car.id)
            .then(data => {
              if(!isCancelled) {
                const sortedData = data.sort((a: any, b: any) => a.model.localeCompare(b.model));
                setModels(sortedData);
              }
            });
            return () => {
                isCancelled = true;
            }
        }
  }, [car]);

    return (
        <ModelDataContext.Provider value={models} >
               {children}
         </ModelDataContext.Provider>
         );
}

export default ModelDataProvider;