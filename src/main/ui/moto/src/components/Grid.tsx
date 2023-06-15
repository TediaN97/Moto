import React from 'react';

import Modal from './Modal';
import Image from './Image';


interface GridProps {
  isClickedEdit: boolean;
  data: any;
  filteredCountry: string;
  searchValue: string;
}

const Grid = (props: GridProps) => {

  return(
       <div>
        {props.isClickedEdit && (
           <div className={`ml-7 mr-3 mt-5 lg:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:ml-28 lg:w-10/12 xl:grid-cols-5 xl:ml-20 xl:w-11/12 gap-4`}>
             {props.data.filter((car: any) => {
                   if(car.brand.toLowerCase().includes(props.searchValue) && car.country.includes(props.filteredCountry)){
                       return car;
                   }}).map((car: any) => (
                          <div key={car.id} className="relative mr-3">
                              <Image brand={car.brand} imageData={car.logo} isClickedEdit={props.isClickedEdit} />
                              <Modal id={car.id} title={`Delete ${car.brand}`} content={`Are you sure you want to remove ${car.brand} brand ?`}/>
                </div>
                   )
             )}
           </div>
      )}
      </div>
      )
}

export default Grid;
