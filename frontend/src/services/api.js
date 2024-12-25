import axios from 'axios';

const API_URL = 'http://localhost:3001/api';


export const getSpecialists = async () => {
    const response = await axios.get(`${API_URL}/specjalisci`);
    return response.data;
};

export const getUserAppointments = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/moje-wizyty`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

export const getSpecialistAvailableSlots = async (specialistId, date) => {
    if (!specialistId || !date) {
      throw new Error('Brak wymaganych parametrów: specialistId, date');
    }
  
    try {
      const response = await axios.get(`${API_URL}/dostepne-terminy`, {
        params: { specialistId, date },
      });
      console.log('API response:', response.data); 
      console.log('pobrano dostepnosc specjalisty')
      return response.data;
    } catch (error) {
      console.error('Błąd pobierania dostępności specjalisty:', error.response?.data || error.message);
      throw error;
    }
};
export const bookAppointment = async (appointmentData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Brak tokenu uwierzytelniającego');
    }
    const response = await axios.post(`${API_URL}/umow-wizyte`, appointmentData, {
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
    const response = await axios.delete(`${API_URL}/wizyta/${appointmentId}`, {
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
    const response = await axios.get(`${API_URL}/pacjent-info`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}