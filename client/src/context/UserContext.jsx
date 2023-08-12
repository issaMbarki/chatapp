import { createContext } from "react";
import { useIsAuth } from "../api/reactQuery";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const { isLoading, data, isError, error } = useIsAuth();
  if (isLoading) {
    return "Loading ...";
  }
  if (isError) {
    console.log(error);
  }
  return (
    <UserContext.Provider value={isError ? {} : data?.data}>
      {children}
    </UserContext.Provider>
  );
}
