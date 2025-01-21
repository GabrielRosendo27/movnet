import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface LoginData {
  email: string;
  password: string;
}
interface LoginResponse {
  Token: string;
}
export function useLoginUser() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loginRequest = async (loginData: LoginData): Promise<LoginResponse> => {
    const response = await fetch("http://localhost:5000/User/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
      const token = data.Token;
      localStorage.setItem("authToken", token);
      navigate("/");
    },
    onError: (err: Error) => {
      setError(err.message || "Erro ao realizar login");
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    error,
  };
}
