// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthProvider} from "./AuthContext";

ReactDOM.render(
    <React.StrictMode>
        <Router> {/* Wrap your App component with BrowserRouter */}
            <AuthProvider>
                <App />
            </AuthProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
