import React from 'react';
import './NavBar.css';
import {
    Link
  } from "react-router-dom";
const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to='/home'>Home</Link></li>
                <li><Link to='/sort'>Sorting Algorithms</Link></li>
                <li><Link to='/search'>Searching Algorithms</Link></li>
                <li><Link to='/pathfind'>Pathfinding Algorithms</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;