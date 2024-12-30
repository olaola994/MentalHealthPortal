import React from 'react';
import AdminAddSpecialistComponent from '../../components/AdminPanel/AdminAddSpecialistComponent';
import UserPanelNavbar from '../../components/UserPanel/UserPanelNavbar';

function AdminAddSpecialistPage() {
    return (
        <>
        <UserPanelNavbar/>
        <div className='admin-add-specialist-page-container'>
            <AdminAddSpecialistComponent/>
        </div>
        </>
    );
}

export default AdminAddSpecialistPage;
