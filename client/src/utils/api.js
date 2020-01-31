import axios from 'axios';

export const apiUrl = 'http://localhost:5000/api';

export const axiosWithAuth = () => {
    return axios.create({
        baseURL: apiUrl,
        headers: {
            authentication: localStorage.getItem('token')
        }
    });
};
