import axios from 'axios';

const API_URL = 'http://localhost:3001/api';


export const getSpecialists = async () => {
    const response = await axios.get(`${API_URL}/specjalisci`);
    return response.data;
};

