import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../components/home/Home";
import { Login } from "../components/login/Login";
import { Register } from "../components/register/Register";
import { useAuth } from "../hooks/useAuthContext";
import { Main } from "../components/main/Main";

export function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={isAuthenticated ? <Main /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
