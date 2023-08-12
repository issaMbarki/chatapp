import { useMutation, useQuery } from "react-query";
import { isAuth, logUserOut, signUserIn, signUserUp } from "./apiServices";

export const useSignUp = () => {
  return useMutation(signUserUp);
};
export const useSignIn = () => {
  return useMutation(signUserIn);
};
export const useIsAuth = () => {
  return useQuery("currentUser", isAuth, {
    retry: false,
    refetchOnWindowFocus: false,
  });
};
export const useLogOut = () => {
  return useMutation(logUserOut);
};
