// Path: full-stack-basic\react-and-express-image_sns\frontend\src\pages\NavBar.js

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from '../store'

const NavBar = () => {
    const navigate = useNavigate();
    const user = useStore(state => state.user)
    const setUser = useStore(state => state.setUser);

    const logout = (event) => {
        event.preventDefault();

        // Remove the token from localStorage
        localStorage.removeItem('token');
        setUser(null)

        // Redirect the user to the login page
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link className="button-link" to="/">Home</Link>
                </li>
                <li>
                    <Link className="button-link" to="/write">Write</Link>
                </li>

                {!user && ( // Only show Register and Login links when not logged in
                    <>
                        <li>
                            <Link className="button-link" to="/register">Register</Link>
                        </li>
                        <li>
                            <Link className="button-link" to="/login">Login</Link>
                        </li>
                    </>
                )}
                {user && ( // Only show Logout link when logged in
                    <li>
                        <Link className="button-link" to="/" onClick={logout}>Logout</Link>
                    </li>
                )}
                <li>
                    <Link className="button-link" to="/information">Information</Link>
                </li>

                <li>
                    <Link className={`button-link ${!user ? "inactive" : ""}`} to="">
                        {user ? user.name : 'Not Log in'}
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
