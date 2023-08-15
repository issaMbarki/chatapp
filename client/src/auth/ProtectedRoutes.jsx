import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import NavBar from "../components/navigation/NavBar";

export const PrivateRoutes = () => {
  const { username } = useContext(UserContext);
  return username ?<> <NavBar/> <Outlet /> </>: <Navigate to="/" />;
};
export const VisitorRoutes = () => {
  const { username } = useContext(UserContext);
  return !username ? <Outlet /> : <Navigate to="/protected" />;
};
