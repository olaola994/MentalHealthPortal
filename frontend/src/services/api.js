import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const getAppointments = async () => {
    const response = await axios.get(`${API_URL}/appointments`);
    return response.data;
};

