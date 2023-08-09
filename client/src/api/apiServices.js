import axios from "../config/axiosConfig";

// export const loginUser = async (credentials) => {
//     const response = await apiService.post('/login', credentials);
//     return response.data;
//   };
export const signUser=(data)=>axios.post('/signup',data)