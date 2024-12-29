import React from 'react';
import AdminMenageAppointmentsComponent from '../../components/AdminPanel/AdminMenageAppointmentsComponent';
import UserPanelNavbar from '../../components/UserPanel/UserPanelNavbar';
import '../../styles/AdminPanel/AdminMenagePage.css';

function AdminAppointmentsPage() {
    return (
        <>
        <UserPanelNavbar/>
        <div className='admin-page-container'>
            <AdminMenageAppointmentsComponent/>
        </div>
        </>
    );
}

export default AdminAppointmentsPage;
