import React from 'react';
import '../../styles/UserPanel/UserAppointmentsPage.css'
import UserAppointmentsComponent from '../../components/UserPanel/UserAppointmentsComponent';

import UserPanelNavbar from '../../components/UserPanel/UserPanelNavbar';

function UserAppointmentsPage() {
    return (
        <>
        <UserPanelNavbar />
        <div className='user-appointments-page-container'>
            <UserAppointmentsComponent/>
        </div>
        </>
    );
}

export default  UserAppointmentsPage;
