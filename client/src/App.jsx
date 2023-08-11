import { QueryClient, QueryClientProvider } from "react-query";
import Authentication from "./pages/Authentication";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedPage from "./pages/ProtectedPage";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication formType='signIn' />} />
          <Route path="/sign-up" element={<Authentication formType='signUp' />} />
          <Route path="/protected" element={<ProtectedPage />} />

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
