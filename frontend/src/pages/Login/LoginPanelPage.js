import React from 'react';
import Navbar from '../../components/Navbar';
import LoginPanelComponent from '../../components/Login/LoginPanelComponent';
import '../../styles/Login/LoginPanelPage.css';

function LoginPanelPage() {
    return (
        <div className='login-panel-page-container'>
            <Navbar />
            <LoginPanelComponent/>
        </div>
    );
}

export default LoginPanelPage;
