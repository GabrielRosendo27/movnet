import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "../../../../hooks/useAuthContext";
import { API_ENDPOINTS } from "../../../../api/api";
import { LoginData, LoginResponse } from "../types/types";
import { useActionNavigation } from "../../../../hooks/useActionNavigation";

export function useLoginUser() {
  const [error, setError] = useState<string | null>(null);
  const { handleActionNavigation } = useActionNavigation();
  const { login } = useAuth();

  const loginRequest = async (loginData: LoginData): Promise<LoginResponse> => {
    const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error("E-mail ou Senha inválidos.");
    }
    return data;
  };

  const mutation = useMutation<LoginResponse, Error, LoginData>({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      login();
      handleActionNavigation("/");
    },
    onError: (err: Error) => {
      setError(err.message || "Erro ao realizar login");
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    error,
    resetError: () => setError(null),
  };
}
