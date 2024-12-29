import React from 'react';
import AdminMenageSpecialistsComponent from '../../components/AdminPanel/AdminMenageSpecialistsComponent';
import UserPanelNavbar from '../../components/UserPanel/UserPanelNavbar';
import '../../styles/AdminPanel/AdminMenagePage.css';

function AdminSpecialistsPage() {
    return (
        <>
        <UserPanelNavbar/>
        <div className='admin-page-container'>
            <AdminMenageSpecialistsComponent/>
        </div>
        </>
    );
}

export default AdminSpecialistsPage;
