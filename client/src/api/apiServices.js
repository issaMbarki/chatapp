import axios from "../config/axiosConfig";

// export const loginUser = async (credentials) => {
//     const response = await apiService.post('/login', credentials);
//     return response.data;
//   };
export const signUserUp=(data)=>axios.post('/signup',data)
export const signUserIn=(data)=>axios.post('/signin',data)

export const  isAuth=()=>axios.post('/signup')