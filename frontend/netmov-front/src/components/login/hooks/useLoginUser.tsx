import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuthContext";
import { API_ENDPOINTS } from "../../../config/api";

interface LoginData {
  email: string;
  password: string;
}
interface LoginResponse {
  token: string;
  refreshToken: string;
}
export function useLoginUser() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginRequest = async (loginData: LoginData): Promise<LoginResponse> => {
    const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error("E-mail ou senha inválidos");
    }

    return response.json();
  };

  const mutation = useMutation<LoginResponse, Error, LoginData>({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      login();
      navigate("/main");
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
