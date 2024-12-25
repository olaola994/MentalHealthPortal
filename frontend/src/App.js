import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SpecialistsPage from './pages/SpecialistsPage';
import HelpFieldsPage from './pages/HelpField/HelpFieldsPage';
import HelpFieldElementComponent from './components/HelpField/HelpFieldElementComponent';
import LoginPanelPage from './pages/Login/LoginPanelPage';
import UserPanelPage from './pages/UserPanel/UserPanelPage';
import ProtectedRoute from './components/ProtectedRoute';
import UserAppointmentsPage from './pages/UserPanel/UserAppointmentsPage';
import AddUserAppointmentsPage from './pages/UserPanel/AddUserAppointmentPage';
import UserAccountInfoPage from './pages/UserPanel/UserAccountInfo/UserAccountInfoPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/specjalisci" element={<SpecialistsPage />} />
                <Route path="/obszaryPomocy" element={<HelpFieldsPage />} />
                <Route path="/obszaryPomocy/:name" element={<HelpFieldElementComponent />} />
                <Route path="/zarejestruj" element={<LoginPanelPage />} />
                <Route path="/panel" element={<ProtectedRoute><UserPanelPage /></ProtectedRoute>}/>
                <Route path="/moje-wizyty" element={<ProtectedRoute><UserAppointmentsPage /></ProtectedRoute>}/>
                <Route path='/umow-wizyte' element={<ProtectedRoute><AddUserAppointmentsPage /></ProtectedRoute>}/>
                <Route path='/moje-konto' element={<ProtectedRoute><UserAccountInfoPage /></ProtectedRoute>}/>
            </Routes>
        </Router>
    );
}

export default App;
