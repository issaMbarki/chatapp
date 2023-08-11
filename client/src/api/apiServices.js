import api from "../config/axiosConfig";

// export const loginUser = async (credentials) => {
//     const response = await apiService.post('/login', credentials);
//     return response.data;
//   };
export const signUserUp=(data)=>api.post('/signup',data)
export const signUserIn=(data)=>api.post('/signin',data)

export const  isAuth=()=>api.post('/signup')