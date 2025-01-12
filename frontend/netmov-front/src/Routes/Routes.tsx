import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "../components/home/Home";
import { Login } from "../components/login/Login";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}