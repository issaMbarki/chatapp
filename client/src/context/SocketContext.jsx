import React, { createContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext(null);

const SocketContextProvider = ({ children }) => {
  const socketRef = useRef();
  const [isSocketConnected,setIsSocketConnected] = useState(false);
  useEffect(() => {
    // Connect to the Socket.IO server when the component mounts
    socketRef.current = io("http://localhost:4000");
    // Set the connection flag when the connection is established
    socketRef.current.on("connect", () => {
      setIsSocketConnected(true)
    });
    // Clean up the connection when the component unmounts
    return () => {
      socketRef.current.disconnect();
    };
  }, []);
if (!isSocketConnected) {
    return 'waiting for socket.io to connect...'
}
  return (
    <SocketContext.Provider value={{socket:socketRef.current}}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketContextProvider };
