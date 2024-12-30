import React from 'react';
import '../../styles/UserPanel/UserAppointmentsPage.css'
import UserPanelNavbar from '../../components/UserPanel/UserPanelNavbar';
import SpecialistCalendarComponent from '../../components/SpecialistPanel/SpecialistCalendarComponent';

function SpecialistCalendarPage() {
    return (
        <>
        <UserPanelNavbar />
        <div className='user-appointments-page-container'>
            <SpecialistCalendarComponent/>
        </div>
        </>
    );
}

export default SpecialistCalendarPage;
