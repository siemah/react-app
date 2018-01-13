import React from 'react';
import { Link } from 'react-router-dom';

let Header = props => {
    return (
        <header>
            <span className='header-item'><Link to={`/`}>Home</Link></span>
            <span className='header-item'><Link to={`/weather`}>Weather</Link></span>
            <span className='header-item'><Link to={`/pray`}>Prayers</Link></span>
            <span className='header-item'><Link to={`/setings`}>Setting</Link></span>
        </header>
    );
};
export default Header;