import React, { ChangeEvent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchProps {
    value: string;
    onTextChange: (value: string) => void;
    input: string
}

const Search: React.FC<SearchProps> = ({ value, onTextChange, input }) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onTextChange(event.target.value);
    }

    return (
            <div className="relative flex items-center w-64 h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden shadow-xl md:mr-5">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                    <FontAwesomeIcon icon={faSearch} className="text-purple-600" />
                </div>

                <input
                    className="peer h-full w-full outline-none text-sm text-purple-600 pr-2"
                    type="text"
                    id="search"
                    placeholder={input}
                    onChange={handleChange}
                    maxLength={15}
                />
            </div>
     );
}

export default Search;