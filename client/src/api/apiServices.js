import api from "../config/axiosConfig";

export const signUserUp = (data) => api.post("/auth/signup", data);
export const signUserIn = (data) => api.post("/auth/signin", data);
export const isAuth = () => api.get("/auth/isAuth");
export const logUserOut = () => api.post("/auth/logout");

//room routes
export const createRoom = (data) => api.post("/room/create", data);
export const getRooms = () => api.get("/room/get");
export const joinRoom = (data) => api.post("/room/join", data);
export const leaveRoom = (data) => api.post("/room/leave", data);


//message routes
export const getMessages = (roomId) => {
  return api.get("/message/get", { params: { roomId } });
};
