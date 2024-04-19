import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Crypto/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AddCrypto from "./pages/Crypto/AddCrypto";
import EditCrypto from "./pages/Crypto/EditCrypto";
import DeleteCrypto from "./pages/Crypto/DeleteCrypto";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/crypto/add"
                        element={
                            <ProtectedRoute>
                                <AddCrypto />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/crypto/edit/:id"
                        element={
                            <ProtectedRoute>
                                <EditCrypto />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/crypto/delete/:id"
                        element={
                            <ProtectedRoute>
                                <DeleteCrypto />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
