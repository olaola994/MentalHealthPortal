import React from 'react';

import UserPanelNavbar from '../../../components/UserPanel/UserPanelNavbar';
import UserAccountInfoComponent from '../../../components/UserPanel/UserAccountInfo/UserAccountInfoComponent';
import '../../../styles/UserPanel/UserAccountInfo/UserAccountInfoPage.css';

function UserAccountInfoPage() {
    return (
        <>
        <UserPanelNavbar />
        <div className='user-account-info-page-container'>
            <UserAccountInfoComponent/>
        </div>
        </>
    );
}

export default UserAccountInfoPage;
