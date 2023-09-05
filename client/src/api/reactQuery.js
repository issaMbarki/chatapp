import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createRoom,
  getRooms,
  isAuth,
  joinRoom,
  logUserOut,
  signUserIn,
  signUserUp,
} from "./apiServices";

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
      queryClient.removeQueries(["rooms"])
    },
  });
};

export const useCreateRooom = () => {
  return useMutation(createRoom);
};
export const useGetRooms = () => {
  return useQuery("rooms", getRooms);
};

export const useJoinRoom = () => {
  return useMutation(joinRoom);
};
