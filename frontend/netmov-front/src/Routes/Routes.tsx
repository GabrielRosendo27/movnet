import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../components/features/home";
import { Login } from "../components/features/login/index";
import { Register } from "../components/features/register/index";
import { useAuth } from "../hooks/useAuthContext";
import { Index } from "../components/ui/menu";
import { UserList } from "../components/features/start/components/UserList";
export function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/start" element={<Index />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/start" element={isAuthenticated ? <Index /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
