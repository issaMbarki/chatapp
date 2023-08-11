import { useMutation } from "react-query";
import { signUserIn, signUserUp } from "./apiServices";

export const useSignUp = () => {
  return useMutation(signUserUp);
};
export const useSignIn = () => {
  return useMutation(signUserIn);
};
