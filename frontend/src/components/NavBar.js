// Path: full-stack-basic\react-and-express-image_sns\frontend\src\pages\NavBar.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    const logout = (event) => {
        event.preventDefault();

        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Redirect the user to the login page
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/write">Write</Link>
                </li>
                <li>
                    <Link to="">User Name</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/" onClick={logout}>Logout</Link>
                </li>
                <li>
                    <Link to="/information">Information</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
