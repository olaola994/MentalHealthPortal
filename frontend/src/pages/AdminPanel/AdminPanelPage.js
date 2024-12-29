import React from 'react';
import '../../styles/UserPanel/UserPanelPage.css'
import AdminPanelComponent from '../../components/AdminPanel/AdminPanelComponent';
import UserPanelNavbar from '../../components/UserPanel/UserPanelNavbar';

function AdminPanelPage() {
    return (
        <>
        <UserPanelNavbar />
        <div className='user-panel-page-container'>
            <AdminPanelComponent/>
        </div>
        </>
    );
}

export default AdminPanelPage;
