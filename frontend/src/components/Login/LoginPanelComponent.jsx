import React, { useState } from 'react';
import '../../styles/Login/LoginPanelComponent.css';

const LoginPanelComponent = () => {

    const [formData, setFormData] = useState({ name: '', surname: '', email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/zarejestruj/patient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className='login-panel-component-container'>
            <div className='login-panel-component-form'>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input name="surname" placeholder="Surname" onChange={(e) => setFormData({ ...formData, surname: e.target.value })} />
                <input name="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <input name="password" type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <button type="submit">Register</button>
            </form>
            </div>
        </div>
    );
}
export default LoginPanelComponent;