import api from "../config/axiosConfig";

export const signUserUp = (data) => api.post("/signup", data);
export const signUserIn = (data) => api.post("/signin", data);
export const isAuth = () => api.get("/isAuth");
export const logUserOut = () => api.post("/logout");

