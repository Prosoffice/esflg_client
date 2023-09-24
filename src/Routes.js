// Routes.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import LegalQuery from './LegalQuery';

function Endpoints() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/legal-query" element={<LegalQuery />} />
            {/* Add more routes as needed */}
        </Routes>
    );
}

export default Endpoints;
