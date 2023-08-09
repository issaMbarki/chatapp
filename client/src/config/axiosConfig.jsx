import axios from 'axios';

axios.defaults.baseURL =process.env.REACT_APP_AXIOS_URI;
export default axios;