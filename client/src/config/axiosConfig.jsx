import axios from 'axios';

// axios.defaults.baseURL = process.env.REACT_APP_AXIOS_URI;
// axios.defaults.withCredentials = true
const api = axios.create({
    baseURL: process.env.REACT_APP_AXIOS_URI,
    withCredentials: true 
  });
export default api;