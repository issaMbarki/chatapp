import { createContext } from "react";
import axios from "../config/axiosConfig";
import { useQuery } from "react-query";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const {
    isLoading,
    data: user,
    isError,
  } = useQuery("currentUser", () =>
    axios
      .get("/isAuth", {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      })
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return "error connecting with the server";
  }
  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
