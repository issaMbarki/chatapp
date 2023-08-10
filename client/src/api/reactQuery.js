import { useMutation,useQuery } from "react-query";
import { signUserIn, signUserUp } from "./apiServices";

export const useSignUp = () => {
  return useMutation(signUserUp);
};
export const useSignIn = () => {
  return useQuery('logUser', signUserIn);
};
