import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SpecialistsPage from './pages/SpecialistsPage';
import HelpFieldsPage from './pages/HelpField/HelpFieldsPage';
import HelpFieldsComponent from './components/HelpField/HelpFieldsComponent';
import HelpFieldElementComponent from './components/HelpField/HelpFieldElementComponent';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/specjalisci" element={<SpecialistsPage />} />
                <Route path="/obszaryPomocy" element={<HelpFieldsPage />} />
                <Route path="/obszaryPomocy/:name" element={<HelpFieldElementComponent />} />
            </Routes>
        </Router>
    );
}

export default App;
