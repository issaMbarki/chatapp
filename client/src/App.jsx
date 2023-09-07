import './App.css';
import { QueryClient, QueryClientProvider } from "react-query";
import Authentication from "./pages/Authentication";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JoinCreate from "./pages/JoinCreate";
import PrivateRoom from "./pages/PrivateRoom";
import { UserContextProvider } from "./context/UserContext";
import { PrivateRoutes, VisitorRoutes } from "./auth/ProtectedRoutes";
import { ThemeContextProvider } from "./context/ThemeContext";
import { SocketContextProvider } from './context/SocketContext';
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ThemeContextProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<VisitorRoutes />}>
                <Route
                  path="/"
                  element={<Authentication formType="signIn" />}
                />
                <Route
                  path="/sign-up"
                  element={<Authentication formType="signUp" />}
                />
              </Route>
              
              <Route element={ <SocketContextProvider><PrivateRoutes /></SocketContextProvider>}>
                <Route path="/join-create" element={<JoinCreate />} />
                <Route path="/private-rooms" element={<PrivateRoom />} />
              </Route>
              
            </Routes>
          </BrowserRouter>
        </ThemeContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
