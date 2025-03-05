import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuthContext";
import { API_ENDPOINTS } from "../api/api";
import { useActionNavigation } from "./useActionNavigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export function useLogout() {
  const { logout } = useAuth();
  const { handleActionNavigation } = useActionNavigation();

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
      NProgress.start();
      const delay = Math.floor(Math.random() * (900 - 300 + 1)) + 300;
      setTimeout(() => {
        logout();
        handleActionNavigation("/");
        NProgress.done();
      }, delay);
    },
    onError: (error) => {
      logout();
      handleActionNavigation("/");
      console.error("Erro ao fazer logout:", error);
    },
  });

  return {
    logout: logoutMutation.mutate,
    isLoad: logoutMutation.isPending,
  };
}
