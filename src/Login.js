// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import {useNavigate} from "react-router-dom";
import {USER_MANAGEMENT_SERVICE_URL} from "./API";
import {useAuth} from "./AuthContext";


function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { setIsAuthenticated } = useAuth();
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const navigator = useNavigate();

    // Handle changes in the form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${USER_MANAGEMENT_SERVICE_URL}/login/access-token`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

            if (response.status === 200) {
                setLoginSuccessful(true);
                setIsAuthenticated(true);
                const token = response.data.access_token;
                // Store the token securely (e.g., in local storage)
                localStorage.setItem('token', token);
                const userData = await axios.get(
                    `${USER_MANAGEMENT_SERVICE_URL}/validate_token/${token}`);

                const firstName = userData.data.first_name
                localStorage.setItem('firstName', firstName);

                // Redirect to another page or perform other actions as needed
                navigator('/legal-query');

                setFormData({
                    username: '',
                    password: ''
                });
            }
        } catch (error) {
            setLoginFailed(true);
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container_wrap">
        <div className="container">
            <h2>Login</h2>
            {loginSuccessful ? (
                <p className="success-message">Login successful! redirecting...</p>
            ) : (
            <form onSubmit={handleSubmit}>
                {loginFailed && <p>Login failed. Please check your credentials.</p>}
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            )}
        </div>
        </div>
    );
}

export default Login;
