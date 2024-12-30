import React from 'react';
import '../../styles/UserPanel/UserAppointmentsPage.css'
import SpecialistAppointmentsComponent from '../../components/SpecialistPanel/SpecialistAppointmentComponent';

import UserPanelNavbar from '../../components/UserPanel/UserPanelNavbar';

function SpecialistAppointmentsPage() {
    return (
        <>
        <UserPanelNavbar />
        <div className='user-appointments-page-container'>
            <SpecialistAppointmentsComponent/>
        </div>
        </>
    );
}

export default SpecialistAppointmentsPage;
