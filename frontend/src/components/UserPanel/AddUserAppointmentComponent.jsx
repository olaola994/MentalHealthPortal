import React, { useState, useEffect } from 'react';
import '../../styles/UserPanel/AddUserAppointmentsComponent.css';
import SpecialistsAvailabilityComponent from './SpecialistsAvailabilityComponent';


const AddUserAppointmentsComponent = () => {

    return (
        <div className='add-user-appointments-component-container'>
            <SpecialistsAvailabilityComponent/>
        </div>
    );
};

export default AddUserAppointmentsComponent;
