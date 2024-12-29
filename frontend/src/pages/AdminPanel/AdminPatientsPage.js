import React from 'react';
import AdminMenagePatientsComponent from '../../components/AdminPanel/AdminMenagePatientsComponent';
import UserPanelNavbar from '../../components/UserPanel/UserPanelNavbar';
import '../../styles/AdminPanel/AdminMenagePage.css';
function AdminPatientsPage() {
    return (
        <>
        <UserPanelNavbar/>
        <div className='admin-page-container'>
            <AdminMenagePatientsComponent/>
        </div>
        </>
    );
}

export default AdminPatientsPage;
