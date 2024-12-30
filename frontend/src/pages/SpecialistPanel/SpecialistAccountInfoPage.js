import React from 'react';
import '../../styles/UserPanel/UserAccountInfo/UserAccountInfoPage.css';
import SpecialistAccountInfoComponent from '../../components/SpecialistPanel/SpecialistAccountInfoComponent';
import UserPanelNavbar from '../../components/UserPanel/UserPanelNavbar';

function SpecialistAccountInfoPage() {
    return (
        <>
        <UserPanelNavbar />
        <div className='user-account-info-page-container'>
            <SpecialistAccountInfoComponent/>
        </div>
        </>
    );
}

export default SpecialistAccountInfoPage;
