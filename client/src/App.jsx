import { QueryClient, QueryClientProvider } from "react-query";
import Authentication from "./pages/Authentication";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedPage from "./pages/ProtectedPage";
import { UserContextProvider } from "./context/UserContext";
import { PrivateRoutes, VisitorRoutes } from "./auth/ProtectedRoutes";
import { ThemeContextProvider } from "./context/ThemeContext";
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
              <Route element={<PrivateRoutes />}>
                <Route path="/protected" element={<ProtectedPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
