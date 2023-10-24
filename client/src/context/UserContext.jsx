import { createContext } from "react";
import { useIsAuth } from "../api/reactQuery";
import { ServerError } from "../pages/errors/ServerError";
import useLoader from "../hooks/useLoader";
import { LinearLoading } from "../components/loading/LinearLoading";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const { isLoading, data, isError, error } = useIsAuth();
  const showLoader= useLoader(isLoading,3000)
  if (showLoader||isLoading) {
    return (
      <LinearLoading/>
    );
  }
  //check if the server is not working
  if (isError && !error?.response?.data) {
    return <ServerError />;
  }
  return (
    <UserContext.Provider value={isError ? {} : data?.data}>
      {children}
    </UserContext.Provider>
  );
}
