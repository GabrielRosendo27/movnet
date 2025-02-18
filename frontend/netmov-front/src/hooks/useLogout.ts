import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuthContext";
import { API_ENDPOINTS } from "../api/api";

export function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Falha no logout");
      }
      return response;
    },
    onSuccess: () => {
      logout();
      navigate("/");
    },
    onError: (error) => {
      console.error("Erro ao fazer logout:", error);
      logout();
      navigate("/");
    },
  });

  return {
    logout: logoutMutation.mutate,
    isLoad: logoutMutation.isPending,
  };
}
