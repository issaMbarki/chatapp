import api from "../config/axiosConfig";

export const signUserUp = (data) => api.post("/auth/signup", data);
export const signUserIn = (data) => api.post("/auth/signin", data);
export const isAuth = () => api.get("/auth/isAuth");
export const logUserOut = () => api.post("/auth/logout");

