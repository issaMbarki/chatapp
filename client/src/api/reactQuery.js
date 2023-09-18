import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createRoom,
  getMessages,
  getRooms,
  isAuth,
  joinRoom,
  logUserOut,
  signUserIn,
  signUserUp,
} from "./apiServices";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";

//auth queries
export const useSignUp = () => {
  return useMutation(signUserUp);
};
export const useSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation(signUserIn, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
};
export const useIsAuth = () => {
  return useQuery("currentUser", isAuth, {
    retry: false,
  });
};
export const useLogOut = () => {
  const queryClient = useQueryClient();
  return useMutation(logUserOut, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
      queryClient.removeQueries(["rooms"]);
    },
  });
};

//room queries
export const useCreateRooom = () => {
  const { socket } = useContext(SocketContext);
  return useMutation(createRoom, {
    onSuccess: (data) => {
      const { roomId } = data?.data;
      socket.emit("joinORcreate-new-room", roomId);
    },
  });
};
export const useGetRooms = () => {
  return useQuery("rooms", getRooms);
};
export const useJoinRoom = () => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  return useMutation(joinRoom, {
    onSuccess: (data) => {
      const { _id: roomId } = data.data.room;
      socket.emit("joinORcreate-new-room", roomId);
      navigate("/private-rooms", {
        state: {
          newJoinedRoom: data.data.room,
        },
      });
    },
  });
};

//message queries
export const useGetMessages = (roomId) => {
  return useQuery(["messages", roomId], () => getMessages(roomId), {
    refetchOnWindowFocus: false,
  });
};
