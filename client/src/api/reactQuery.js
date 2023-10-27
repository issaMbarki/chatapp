import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createRoom,
  getMessages,
  getRooms,
  isAuth,
  joinRoom,
  leaveRoom,
  logUserOut,
  signUserIn,
  signUserUp,
} from "./apiServices";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";

//auth queries
export const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation(signUserUp, {
    onSuccess: () => {
      navigate("/",{
        state: {
          signedIn: true,
        },
      });
    },
  });
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
    refetchOnWindowFocus: false,
  });
};
export const useLogOut = () => {
  const queryClient = useQueryClient();
  return useMutation(logUserOut, {
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(["currentUser"]);
        queryClient.removeQueries(["rooms"]);
        queryClient.removeQueries(["messages"]);
      }, 1000);
    },
  });
};

//room queries
export const useCreateRooom = () => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  return useMutation(createRoom, {
    onSuccess: (data) => {
      const { _id: roomId } = data.data.newRoom;
      socket.emit("joinORcreate-new-room", roomId);
      navigate("/private-rooms", {
        state: {
          newJoinedRoom: data.data.newRoom,
        },
      });
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

export const useLeaveRoom = () => {
  const queryClient = useQueryClient();
  const { socket } = useContext(SocketContext);
  return useMutation(leaveRoom, {
    onSuccess: (data) => {
      const { _id: roomId } = data.data.room;
      queryClient.invalidateQueries(["rooms"]);
      socket.emit("leave-room", roomId);
    },
  });
};

//message queries
export const useGetMessages = (roomId) => {
  return useQuery(["messages", roomId], () => getMessages(roomId), {
    refetchOnWindowFocus: false,
  });
};
