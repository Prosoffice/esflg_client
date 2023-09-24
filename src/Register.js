import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { USER_MANAGEMENT_SERVICE_URL } from './API';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        is_admin: false,
        password: '',
    });

    const [registrationSuccessful, setRegistrationSuccessful] = useState(false);
    const [registrationError, setRegistrationError] = useState('');
    const navigator = useNavigate();

    // Handle changes in the form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make an HTTP POST request to your backend's register endpoint
            const response = await axios.post(`${USER_MANAGEMENT_SERVICE_URL}/register`, formData);
            if (response.status === 200) {
                setRegistrationSuccessful(true);


                // Redirect to the login page on successful registration
                setTimeout(() => {
                    navigator('/login');
                }, 3000);

            }

            // Clear the form fields after successful registration
            setFormData({
                email: '',
                first_name: '',
                last_name: '',
                is_admin: false,
                password: '',
            });
        } catch (error) {
            // Handle registration errors (e.g., display an error message)
            console.error('Registration failed:', error);
            setRegistrationError('Registration failed due to Validation Error');
        }
    };

    return (
        <div className="container_wrap">
            <div className="container">
                <h2>Register</h2>
                {registrationSuccessful ? (
                    <p className="success-message">Registration successful! You can now log in.</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {registrationError && <p className="error-message">{registrationError}</p>}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                name="first_name"
                                id="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="last_name"
                                id="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
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
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit">Register</button>
                    </form>
                )}
            </div>

        </div>
    );
}

export default Register;
