import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [keyword, setKeyword] = useState('');

    const searchHandler = (event) => {

        event.preventDefault();
        navigate(`/search/${keyword}`)
    }

    const clearKeyword = () => {
        setKeyword('');
    }

    useEffect(() => {
        if (location.pathname === '/') {
            clearKeyword();
        }
    }, [location])


    return (

        <form onSubmit={searchHandler}>
            <div className="input-group">
                <input
                    type="search"
                    id="search_field"
                    placeholder="Enter Product Name..."
                    onChange={(event) => setKeyword(event.target.value)}
                    value={keyword}

                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </form >

    )
}

export default Search;