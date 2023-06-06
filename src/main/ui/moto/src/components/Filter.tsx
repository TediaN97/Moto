import React, { MouseEvent, useState, TouchEvent, useRef }from 'react';

interface FilterProps {
    data: any;
    onChangeCountry: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ data, onChangeCountry }) => {

  let counter = 1;

  //referencies
  const carouselRef = useRef<HTMLDivElement>(null);

  //hooks
  const [isDragStart, setIsDragStart] = useState(false);
  const [prevPageX, setPrevPageX] = useState<number>(0);
  const [prevScrollLeft, setPrevScrollLeft] = useState<number>(0);
  const [name, setName ] = useState('');
  let [clickedTwice, setClickedTwice] = useState(false);

  //global variables
  let value: number = 0;
  let deltaX: number = 0;
  let isDragging: boolean = false;

  const draggingTouch = (e: TouchEvent<HTMLDivElement>) => {
            if(!isDragStart) return;
            e.persist();

            const pageX = e.touches[0].pageX;

            if (carouselRef.current && prevPageX !== null && prevScrollLeft !== null) {
                 deltaX = pageX - prevPageX;
                 value = prevScrollLeft - deltaX;
                 carouselRef.current.scrollLeft = value;
            }
        }

     const dragTouchStart = (e: TouchEvent<HTMLDivElement>) => {
             if (carouselRef.current) {
                 setIsDragStart(true);
                 setPrevPageX(e.touches[0].pageX);
                 setPrevScrollLeft(carouselRef.current.scrollLeft);
             }
        }

        const dragStop = () => {
             setIsDragStart(false);

             if(!isDragging) return;
             isDragging = false;
        }


  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
       if(name === (event.target as HTMLButtonElement).name){
          if(!clickedTwice){
            onChangeCountry("");
            setClickedTwice(true);
          } else {
                onChangeCountry((event.target as HTMLButtonElement).name);
                setClickedTwice(false);
            }
        }else {
            onChangeCountry((event.target as HTMLButtonElement).name);
            setName((event.target as HTMLButtonElement).name);
            setClickedTwice(false);
        }
  }

  const unique = [...(new Set(data.map((car: any) => car.country)) as any)];

  return (
        <div ref={carouselRef} className="w-full text-sm cursor-pointer overflow-hidden flex scroll-smooth items-center" onTouchMove={draggingTouch} onTouchStart={dragTouchStart} onTouchEnd={dragStop}>
            {unique.filter((car:any) => car.length ).map((car: any) => {
                    return (
                    <button
                        key={counter++}
                        name={car}
                        className="whitespace-nowrap font-rowdies p-4 mr-4 text-md rounded-3xl font-light shadow-md bg-light-purple text-dark-purple "
                        onClick={handleClick}
                    >
                            {car}
                    </button> )}
                )
            }
        </div>
   )
}

export default Filter;