import { useMutation, UseMutationResult } from "@tanstack/react-query";

export interface RegisterUserPayload {
  user: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

const registerUser = async (data: RegisterUserPayload): Promise<RegisterResponse> => {
  const response = await fetch("https://seu-backend/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Erro ao registrar usuário");
  }
  return response.json();
};

export const useRegisterUser = (): UseMutationResult<RegisterResponse, Error, RegisterUserPayload> => {
  return useMutation<RegisterResponse, Error, RegisterUserPayload>({ mutationFn: registerUser });
};
