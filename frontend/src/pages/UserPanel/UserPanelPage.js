import React from 'react';
import '../../styles/UserPanel/UserPanelPage.css'
import UserPanelComponent from '../../components/UserPanel/UserPanelComponent';
import UserPanelNavbar from '../../components/UserPanel/UserPanelNavbar';

function UserPanelPage() {
    return (
        <>
        <UserPanelNavbar />
        <div className='user-panel-page-container'>
            <UserPanelComponent/>
        </div>
        </>
    );
}

export default UserPanelPage;
