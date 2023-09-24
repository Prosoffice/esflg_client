import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {useAuth} from "./AuthContext"; // Import your Auth class

function Navbar() {
    // Check if the user is authenticated using your Auth class
    const { isAuthenticated, logout} = useAuth();
    const userFirstName = localStorage.getItem('firstName'); // Retrieve the user's first name from local storage


    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-logo">
                    <Link to="/" className="navbar-logo-text">Legal Expert System</Link>
                </li>
                {/* Conditionally render the "Register" and "Login" links based on authentication status */}
                {!isAuthenticated ? (
                    <>
                        <li className="navbar-item">
                            <Link to="/register" className="navbar-link">Register</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/login" className="navbar-link">Login</Link>
                        </li>
                    </>
                ) : (
                    <div className="b">
                    <li className="navbar-item">
                        <Link to="#" className="navbar-user">{`Hello, ${userFirstName}`}</Link>
                    </li>
                        <li className="navbar-item">
                            <Link to="/login" onClick={logout} className="navbar-user">Logout</Link>
                        </li>
                    </div>

                )}
                {/* Add more navigation links as needed */}
            </ul>
        </nav>
    );
}

export default Navbar;
