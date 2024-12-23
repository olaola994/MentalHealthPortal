import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SpecialistsPage from './pages/SpecialistsPage';
import HelpFieldsPage from './pages/HelpField/HelpFieldsPage';
import HelpFieldElementComponent from './components/HelpField/HelpFieldElementComponent';
import LoginPanelPage from './pages/Login/LoginPanelPage';
import UserPanelPage from './pages/UserPanel/UserPanelPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/specjalisci" element={<SpecialistsPage />} />
                <Route path="/obszaryPomocy" element={<HelpFieldsPage />} />
                <Route path="/obszaryPomocy/:name" element={<HelpFieldElementComponent />} />
                <Route path="/zarejestruj" element={<LoginPanelPage />} />
                <Route
                    path="/panel" element={<ProtectedRoute><UserPanelPage /></ProtectedRoute>}
                />
            </Routes>
        </Router>
    );
}

export default App;
