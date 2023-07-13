import React, { MouseEvent, useState, TouchEvent, useRef, useContext, useEffect }from 'react';
import FilteredButton from './FilteredButton';
import { ModelDataContext } from './ModelDataProvider';
import { useLocation } from 'react-router-dom';

interface FilterProps {
    data: any;
    onChangeValue: (value: string) => void;
    filter: string;
}

const Filter: React.FC<FilterProps> = ({ data, onChangeValue, filter }) => {

  const models = useContext(ModelDataContext);

  const location = useLocation();
  if(location.pathname !== '/'){
    data = models;
  }

  let counter = 1;

  //referencies
  const carouselRef = useRef<HTMLDivElement>(null);

  //hooks
  const [isDragStart, setIsDragStart] = useState(false);
  const [prevPageX, setPrevPageX] = useState<number>(0);
  const [prevScrollLeft, setPrevScrollLeft] = useState<number>(0);
  const [name, setName ] = useState('');
  const [clickedTwice, setClickedTwice] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [itemId, setItemId] = useState<number | null>(null);

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


  const handleClick = (event: MouseEvent<HTMLButtonElement>, key:number) => {
       setItemId(key);
       if(name === (event.target as HTMLButtonElement).name){
          if(!clickedTwice){
            setItemId(null);
            onChangeValue("");
            setClickedTwice(true);
          } else {
                onChangeValue((event.target as HTMLButtonElement).name);
                setClickedTwice(false);
            }
        }else {
            onChangeValue((event.target as HTMLButtonElement).name);
            setName((event.target as HTMLButtonElement).name);
            setClickedTwice(false);
        }
  }

  const unique = [...(new Set(data.map((item: any) => item[filter] )) as any)];

  return (
        <div ref={carouselRef} className="w-full text-sm cursor-pointer overflow-hidden flex scroll-smooth items-center" onTouchMove={draggingTouch} onTouchStart={dragTouchStart} onTouchEnd={dragStop}>
            {unique.filter((item:any) => item.length ).map((item: any, index: number) => {
                    return (
                        <FilteredButton key={index} onClick={(event) => handleClick(event, index)} isActive={itemId === index} name={item} />
                    )
            })}
        </div>
   )
}

export default Filter;