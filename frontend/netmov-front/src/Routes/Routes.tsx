import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../components/features/home";
import { Login } from "../components/features/login/index";
import { Register } from "../components/features/register/index";
import { useAuth } from "../hooks/useAuthContext";
import { Main } from "../components/main/Main";
import { UserList } from "../components/main/user-list/UserList";
export function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/main" element={isAuthenticated ? <Main /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
