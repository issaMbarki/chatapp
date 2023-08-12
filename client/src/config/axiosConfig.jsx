import axios from 'axios';

const api = axios.create({
    // baseURL: process.env.REACT_APP_AXIOS_PHONE_URI, 
    baseURL: process.env.REACT_APP_AXIOS_URI,
    withCredentials: true 
  });
export default api;