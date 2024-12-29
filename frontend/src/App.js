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
import AdminPanelPage from './pages/AdminPanel/AdminPanelPage';
import AdminPatientsPage from './pages/AdminPanel/AdminPatientsPage';
import AdminSpecialistsPage from './pages/AdminPanel/AdminSpecialistsPage';
import AdminAppointmentsPage from './pages/AdminPanel/AdminAppointmentsPage';

function App() {
    return (
        <Router>
            <Routes>
                {/* gość */}
                <Route path="/" element={<HomePage />} />
                <Route path="/specjalisci" element={<SpecialistsPage />} />
                <Route path="/obszaryPomocy" element={<HelpFieldsPage />} />
                <Route path="/obszaryPomocy/:name" element={<HelpFieldElementComponent />} />
                <Route path="/zarejestruj" element={<LoginPanelPage />} />

                {/* pacjent */}
                <Route path="/panel" element={<ProtectedRoute allowedRoles={['Patient']}><UserPanelPage /></ProtectedRoute>}/>
                <Route path="/moje-wizyty" element={<ProtectedRoute allowedRoles={['Patient']}><UserAppointmentsPage /></ProtectedRoute>}/>
                <Route path='/umow-wizyte' element={<ProtectedRoute allowedRoles={['Patient']}><AddUserAppointmentsPage /></ProtectedRoute>}/>
                <Route path='/moje-konto' element={<ProtectedRoute allowedRoles={['Patient']}><UserAccountInfoPage /></ProtectedRoute>}/>

                {/* admin */}
                <Route path="/admin-panel" element={<ProtectedRoute allowedRoles={['Admin']}><AdminPanelPage /></ProtectedRoute>}/>
                <Route path="/admin-pacjenci" element={<ProtectedRoute allowedRoles={['Admin']}><AdminPatientsPage /></ProtectedRoute>}/>
                <Route path="/admin-specjalisci" element={<ProtectedRoute allowedRoles={['Admin']}><AdminSpecialistsPage /></ProtectedRoute>}/>
                <Route path="/admin-wizyty" element={<ProtectedRoute allowedRoles={['Admin']}><AdminAppointmentsPage /></ProtectedRoute>}/>
            </Routes>
        </Router>
    );
}

export default App;
