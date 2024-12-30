import React from 'react';
import '../../styles/UserPanel/UserPanelPage.css'
import SpecialistPanelComponent from '../../components/SpecialistPanel/SpecialistPanelComponent';
import UserPanelNavbar from '../../components/UserPanel/UserPanelNavbar';

function SpecialistPanelPage() {
    return (
        <>
        <UserPanelNavbar />
        <div className='user-panel-page-container'>
            <SpecialistPanelComponent/>
        </div>
        </>
    );
}

export default SpecialistPanelPage;
