import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Appointments from './pages/Appointments';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/appointments" element={<Appointments />} />
            </Routes>
        </Router>
    );
}

export default App;
