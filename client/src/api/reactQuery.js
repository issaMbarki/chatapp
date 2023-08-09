import { useMutation } from "react-query";
import { signUser } from "./apiServices";

export const useSignUp = () => {
  return useMutation(signUser);
};

