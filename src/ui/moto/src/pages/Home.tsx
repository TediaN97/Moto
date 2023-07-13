import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContentBrand from '../components/ContentBrand';
import Search from '../components/Search';
import Button from '../components/Button';
import Filter from '../components/Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';


interface HomeProps {
    data: any;
    user: any;
    onLogout: (value: any) => void;
}

const Home: React.FC<HomeProps> = ({data, user, onLogout }) => {

  //useState
  const [textValue, setTextValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [filteredCountry, setFilteredCountry] = useState('');
  const [bgColor, setBgColor] = useState("white hover:bg-purple-100");
  const [shadowColor, setShadowColor] = useState("white hover:bg-purple-100");
  const [textColor, setTextColor] = useState("text-purple-600");

  const handleClick = async () => {
      await setIsClicked(!isClicked);
      !isClicked ? setBgColor("bg-purple-800") : setBgColor("white hover:bg-purple-100");
      !isClicked ? setShadowColor("purple-800") : setShadowColor("white hover:bg-purple-100");
      !isClicked ? setTextColor("text-white") : setTextColor("text-purple-600");
      if(isClicked){
        setFilteredCountry("");
      }
  }

  const handleTextChange = (value: string) => {
        setTextValue(value);
        setSearchValue(value.toLowerCase())
  }

  const handleChangeCountry = ( value: string ) => {
        setFilteredCountry(value);
  }

  const handleLogout = (value: any ) => {
    onLogout([]);
  }

  //changeNameTitle
    useEffect(() => {
        document.title = 'MOTOWIKI';
      }, []);

  return (
    <div className="h-screen m-0 p-0 box-border flex flex-col font-rowdies font-light bg-purple-100 bg-opacity-30 text-purple-600">
        <Header name="MOTOWIKI" user={user} onLogout={handleLogout}/>
        <div className="flex-grow">
            <div className="mt-5 ml-5 flex justify-evenly md:ml-0 lg:justify-end">
                    <p onClick={handleClick} className="mt-6 ml-10 text-lg font-rowdies font-light hidden">Home</p>
                    <Search value={textValue} onTextChange={handleTextChange} input={"Search brand.."}/>
                    <Button shadowColor={shadowColor} backgroundColor={bgColor} name={<svg className={`fill-current ${textColor}`}
                                    width="20"
                                    height="13"
                                    viewBox="0 0 20 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                        d="M13.8293 11C13.4175 12.1652 12.3062 13 11 13C9.69378 13 8.58254 12.1652 8.17071 11H1C0.447715 11 0 10.5523 0 10C0 9.44772 0.447715 9 1 9H8.17071C8.58254 7.83481 9.69378 7 11 7C12.3062 7 13.4175 7.83481 13.8293 9H19C19.5523 9 20 9.44772 20 10C20 10.5523 19.5523 11 19 11H13.8293ZM7.82929 4C7.41746 5.16519 6.30622 6 5 6C3.69378 6 2.58254 5.16519 2.17071 4H1C0.447715 4 0 3.55228 0 3C0 2.44772 0.447715 2 1 2H2.17071C2.58254 0.834808 3.69378 0 5 0C6.30622 0 7.41746 0.834808 7.82929 2H19C19.5523 2 20 2.44772 20 3C20 3.55228 19.5523 4 19 4H7.82929ZM5 4C5.55228 4 6 3.55228 6 3C6 2.44772 5.55228 2 5 2C4.44772 2 4 2.44772 4 3C4 3.55228 4.44772 4 5 4ZM11 11C11.5523 11 12 10.5523 12 10C12 9.44772 11.5523 9 11 9C10.4477 9 10 9.44772 10 10C10 10.5523 10.4477 11 11 11Z"
                                    />
                                  </svg>
                            } onClick={handleClick} />
            </div>
            <div className="min-w-sm cursor-pointer ml-4">
                <div className="mt-5 text-sm cursor-pointer overflow-hidden flex scroll-smooth ml-3 h-20">
                    {isClicked && (
                        <Filter data={data} filter={"country"} onChangeValue={handleChangeCountry} />
                    )}
                </div>
            </div>
            <ContentBrand data={data} searchValue={searchValue} filteredCountry={filteredCountry} user={user}/>
        </div>
        <Footer />
    </div>
  );
}

export default Home;