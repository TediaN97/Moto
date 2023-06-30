import React from 'react';

import Modal from './Modal';
import Image from './Image';
import Update from './Update';
import Tile from './Tile';


interface GridModelProps {
  data: any;
  filteredBodywork: string;
  searchValue: string;
}

const GridModel = (props: GridModelProps) => {

  return(
       <div>
           <div className={`ml-7 mr-3 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:mt-12 lg:grid-cols-4 lg:ml-28 lg:w-10/12 xl:grid-cols-5 xl:ml-20 xl:w-11/12 gap-4 scroll-smooth`}>
             {props.data.filter((model: any) => {
                   if(model.model.toLowerCase().startsWith(props.searchValue) && model.bodywork.includes(props.filteredBodywork)){
                       return model;
                   }}).map((model: any) => (
                        <div key={model.id} className="bg-purple-800 w-80 h-80">
                          <Tile data={model} />
                        </div>
                   )
             )}
           </div>
      </div>
      )
}

export default GridModel;
