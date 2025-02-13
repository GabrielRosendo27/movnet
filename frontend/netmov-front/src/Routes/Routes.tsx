import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../components/features/home";
import { Login } from "../components/features/login/index";
import { Register } from "../components/features/register/index";
import { useAuth } from "../hooks/useAuthContext";
import { UserList } from "../components/features/start/components/UserList";
import { Start } from "../components/features/start";

export function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/start" element={isAuthenticated ? <Start /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
