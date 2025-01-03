import apiClient from './apiClient';

const API_URL = 'http://localhost:3001/api';


export const getSpecialists = async () => {
    try {
        const response = await apiClient.get(`${API_URL}/specjalisci`);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania listy specjalistów:', error.response?.data || error.message);
        throw new Error('Nie udało się pobrać listy specjalistów.');
    }
};

export const getUserAppointments = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }

    try {
        const response = await apiClient.get(`${API_URL}/moje-wizyty`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania wizyt użytkownika:', error.response?.data || error.message);
        throw new Error('Nie udało się pobrać wizyt użytkownika.');
    }
};

export const getSpecialistAppointments = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }

    try {
        const response = await apiClient.get(`${API_URL}/specjalista-wizyty`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Błąd podczas pobierania wizyt specjalisty:', error.response?.data || error.message);
        throw new Error('Nie udało się pobrać wizyt specjalisty.');
    }
};

export const getSpecialistAvailableSlots = async (specialistId, date) => {
    if (!specialistId || !date) {
      throw new Error('Brak wymaganych parametrów: specialistId, date');
    }
  
    const response = await apiClient.get(`${API_URL}/dostepne-terminy`, {
        params: { specialistId, date },
    });
    return response.data;
};
export const bookAppointment = async (appointmentData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    const response = await apiClient.post(`${API_URL}/umow-wizyte`, appointmentData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const cancelAppointment = async (appointmentId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    const response = await apiClient.delete(`${API_URL}/wizyta/${appointmentId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getPatientInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    const response = await apiClient.get(`${API_URL}/pacjent-info`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
export const getSpecialistInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    const response = await apiClient.get(`${API_URL}/specjalista-info`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const addUserAddress = async (addressData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    try{
        const response = await apiClient.post(`${API_URL}/dodaj-adres`, addressData,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(addressData);
        return response.data;
    }catch (error) {
        console.error('Błąd podczas dodawania adresu:');
        throw new Error('Wystąpił błąd podczas dodawania adresu.');
    }
}

export const getAdminPatients = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    const response = await apiClient.get(`${API_URL}/admin-pacjenci`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
export const getAdminSpecialists = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    const response = await apiClient.get(`${API_URL}/admin-specjalisci`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
export const getAdminAppointments = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    const response = await apiClient.get(`${API_URL}/admin-wizyty`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
export const removePatient = async (patientId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    const response = await apiClient.delete(`${API_URL}/admin-usun-pacjenta/${patientId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
export const removeSpecialist = async (specialistId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    const response = await apiClient.delete(`${API_URL}/admin-usun-specjaliste/${specialistId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const checkUserExists = async (userId, userType) => {
    try {
        const endpoint = userType === 'patient' ? 'sprawdz-pacjenta' : 'sprawdz-specjaliste';
        const response = await apiClient.get(`${API_URL}/${endpoint}/${userId}`);
        return response.data.exists;
    } catch (error) {
        console.error('Błąd przy sprawdzaniu istnienia użytkownika:', error);
        return false;
    }
};

export const addSpecialist = async (specialistData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    try{
        const response = await apiClient.post(`${API_URL}/dodaj-specjaliste`, specialistData,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(specialistData);
        return response.data;
    }catch (error) {
        console.error('Błąd podczas dodawania specjalisty:');
        throw new Error('Wystąpił błąd podczas dodawania specjalisty.');
    }
}

export const changePassword = async (newPassword) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    try{
        const response = await apiClient.post(`${API_URL}/zmien-haslo`, newPassword, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch (error) {
        console.error('Błąd podczas zmiany hasła:');
        throw new Error('Wystąpił błąd podczas zmiany hasła.');
    }
}

export const addSpecialistDescription = async (description) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    try{
        const response = await apiClient.post(`${API_URL}/specjalista-dodaj-opis`, {description},{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch (error) {
        console.error('Błąd podczas dodawania opisu:');
        throw new Error('Wystąpił błąd podczas dodawania opisu.');
    }
}

export const addTimetableRecord = async (timetablerecordData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    try{
        const response = await apiClient.post(`${API_URL}/specjalista-dodaj-dostepnosc`, timetablerecordData,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch (error) {
        console.error('Błąd podczas dodawania dostępności:');
        throw new Error('Wystąpił błąd podczas dodawania dostępności.');
    }
}

export const getSpecialistCalendar = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    const response = await apiClient.get(`${API_URL}/specjalista-dostepnosc`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deleteTimetableRecord = async (timetableRecordId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    const response = await apiClient.delete(`${API_URL}/specjalista-usun-dostepnosc/${timetableRecordId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};