import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { UserContext } from "./UserContext";
import io from "socket.io-client";
import { LinearLoading } from "../components/loading/LinearLoading";
import { ServerError } from "../pages/errors/ServerError";

const SocketContext = createContext(null);

const SocketContextProvider = ({ children }) => {
  const socketRef = useRef();
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [isError, setIsError] = useState(false);
  const { _id: userId } = useContext(UserContext);
  useEffect(() => {
    // Connect to the Socket.IO server when the component mounts
    socketRef.current = io(process.env.REACT_APP_SERVER_URI);
    // Set the connection flag when the connection is established
    socketRef.current.on("connect", () => {
      setIsSocketConnected(true);
    });
    // Handle connection errors
    socketRef.current.on("error", (error) => {
      setIsError(true)
      console.log("Socket.IO connection error:", error);
    });

    socketRef.current.emit("join-rooms", { userId });
    // Clean up the connection when the component unmounts
    return () => {
      socketRef.current.disconnect();
    };
  }, [userId]);

  if (!isSocketConnected&&!isError) {
    return <LinearLoading />;
  }
  if (isError) {
    console.log("haaaaaa");
    return <ServerError/>
  }

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketContextProvider };
