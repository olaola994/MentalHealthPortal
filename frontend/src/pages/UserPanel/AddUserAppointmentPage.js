import React from 'react';
import '../../styles/UserPanel/AddUserAppointmentsPage.css'
import AddUserAppointmentsComponent from '../../components/UserPanel/AddUserAppointmentComponent';

import UserPanelNavbar from '../../components/UserPanel/UserPanelNavbar';

function AddUserAppointmentsPage() {
    return (
        <>
        <UserPanelNavbar />
        <div className='add-user-appointments-page-container'>
            <AddUserAppointmentsComponent/>
        </div>
        </>
    );
}

export default AddUserAppointmentsPage;
