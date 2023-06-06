import React, { ChangeEvent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchProps {
    value: string;
    onTextChange: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ value, onTextChange }) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onTextChange(event.target.value);
    }

    return (
        <div className='max-w-md mx-auto'>
            <div className="relative flex items-center w-64 h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                    <FontAwesomeIcon icon={faSearch} />
                </div>

                <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    id="search"
                    placeholder="Search brand.."
                    onChange={handleChange}
                />
            </div>
        </div>
     );
}

export default Search;