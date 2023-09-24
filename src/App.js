// src/App.js

import React from 'react';
import Endpoints from './Routes'; // Import the Routes component
import Navbar from './Navbar'; // Import your Navbar component
import './App.css';

function App() {
  return (
      <div>
        <Navbar /> {/* Include your navigation bar */}
        <Endpoints /> {/* Include the Routes component */}
      </div>
  );
}

export default App;
