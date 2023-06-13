import React, { useRef, useState, MouseEvent, TouchEvent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft,faAngleRight, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Image from './Image';
import { useNavigate } from 'react-router-dom';
import Button from './Button';


interface SliderProps {
    data: any;
    searchValue: string;
    filteredCountry: string;
}

const Slider: React.FC<SliderProps> = ({ data, searchValue, filteredCountry }) => {

  //referencies
  const carouselRef = useRef<HTMLDivElement>(null);
  const leftArrowIconRef = useRef<SVGSVGElement>(null);
  const rightArrowIconRef = useRef<SVGSVGElement>(null);

  const navigate = useNavigate();

  //hooks
  const [isDragStart, setIsDragStart] = useState(false);
  const [prevPageX, setPrevPageX] = useState<number>(0);
  const [prevScrollLeft, setPrevScrollLeft] = useState<number>(0);
  const [isClickedEdit, setIsClickedEdit] = useState(false);

  //global variables
  let value: number = 0;
  let deltaX: number = 0;
  let isDragging: boolean = false;

   const dragging = (e: MouseEvent<HTMLDivElement>) => {
       if(!isDragStart) return;
       e.preventDefault();

       isDragging = true;
       const pageX = e.pageX;

       if (carouselRef.current && prevPageX !== null && prevScrollLeft !== null) {
            deltaX = pageX - prevPageX;
            value = prevScrollLeft - deltaX;
            carouselRef.current.scrollLeft = value;
            setTimeout(() => { showHideIcons(); }, 60);
       }
   }

   const draggingTouch = (e: TouchEvent<HTMLDivElement>) => {
          if(!isDragStart) return;
          e.persist();

          const pageX = e.touches[0].pageX;

          if (carouselRef.current && prevPageX !== null && prevScrollLeft !== null) {
               deltaX = pageX - prevPageX;
               value = prevScrollLeft - deltaX;
               carouselRef.current.scrollLeft = value;
               setTimeout(() => { showHideIcons(); }, 60);
          }
      }

   const dragTouchStart = (e: TouchEvent<HTMLDivElement>) => {
           if (carouselRef.current) {
               setIsDragStart(true);
               setPrevPageX(e.touches[0].pageX);
               setPrevScrollLeft(carouselRef.current.scrollLeft);
           }
      }

   const dragStart = (e: MouseEvent<HTMLDivElement>) => {
        if (carouselRef.current) {
            setIsDragStart(true);
            setPrevPageX(e.pageX);
            setPrevScrollLeft(carouselRef.current.scrollLeft);
        }
   }

   const dragStop = () => {
        setIsDragStart(false);

        if(!isDragging) return;
        isDragging = false;
   }

    const showHideIcons = () => {
       if (carouselRef.current) {
         const scrollWidth = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
         if (leftArrowIconRef.current) {
           leftArrowIconRef.current.style.display = carouselRef.current.scrollLeft === 0 ? "none" : "block";
         }
         if (rightArrowIconRef.current) {
           rightArrowIconRef.current.style.display = Math.ceil(carouselRef.current.scrollLeft) === scrollWidth ? "none" : "block";
         }
       }
     };

    const handleClick = (event: MouseEvent<SVGSVGElement>) => {
        if(carouselRef.current !== null) {
            const firstImg = carouselRef.current?.children[0] as SVGSVGElement;
            if(firstImg !== null){
                const clickedIcon = event.currentTarget;
                const firstImgWidth: number = firstImg.clientWidth + 20;
//                 const clickedIcon = event.currentTarget;
//                 const containerWidth = carouselRef.current.offsetWidth;
                carouselRef.current.scrollLeft += clickedIcon.dataset.icon === 'angle-left' ? - firstImgWidth : firstImgWidth;
                 setTimeout(() => { showHideIcons(); }, 60);
            }
        }
    }

    const handleAddClick = () => {
        navigate('/car/carForm');
    }


  return (
    <div className="min-w-sm cursor-pointer ml-7 mt-2">
        <div className="flex justify-between items-center">
            <p className="text-xl font-bold" >Brands</p>
            <FontAwesomeIcon icon={faPlus} className="mr-12 text-purple-600 lg:hidden" onClick={handleAddClick} />
            <div className="flex">
                <Button name="Add brand" onClick={handleAddClick} isResponsiveButton={true} />
            </div>
       </div>
           <div className="lg:fixed lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-10/12">
               <div ref={carouselRef} className="relative mt-5 text-sm cursor-pointer overflow-hidden flex scroll-smooth" onMouseMove={dragging} onMouseDown={dragStart} onMouseUp={dragStop} onMouseLeave={dragStop} onTouchMove={draggingTouch} onTouchStart={dragTouchStart} onTouchEnd={dragStop}>
                      {data.filter((car: any) => {
                            if(car.brand.toLowerCase().includes(searchValue) && car.country.includes(filteredCountry)){
                                return car;
                             }}).map((car: any) => (
                               <Image key={car.id} brand={car.brand} imageData={car.logo} />
                            )
                      )}
               </div>
        </div>
       <div className="hidden lg:flex">
           <FontAwesomeIcon ref={leftArrowIconRef} className="top-1/2 h-11 w-11 text-white cursor-pointer text-xl text-center leading-11 bg-purple-600 rounded-full absolute translate-y-1/2 transition-transform duration-100 ease-linear left-6 hover:opacity-80 active:opacity-100" icon={faAngleLeft} onClick={handleClick} />
           <FontAwesomeIcon ref={rightArrowIconRef} className="top-1/2 h-11 w-11 text-white cursor-pointer text-xl text-center leading-10 bg-purple-600 rounded-full absolute translate-y-1/2 transition-transform duration-100 ease-linear right-6 hover:opacity-80 active:opacity-100" icon={faAngleRight} onClick={handleClick} />
       </div>
    </div>
  );
}

export default Slider;