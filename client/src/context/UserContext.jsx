import { createContext } from "react";
import { useIsAuth } from "../api/reactQuery";
import { ServerError } from "../pages/errors/ServerError";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const { isLoading, data, isError,error } = useIsAuth();
  if (isLoading) {
    return "Loading ...";
  }
  //check if the server is not working
  if (isError&&!(error?.response?.data)) {
    return <ServerError/>
  }
  return (
    <UserContext.Provider value={isError ? {} : data?.data}>
      {children}
    </UserContext.Provider>
  );
}
