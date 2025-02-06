import { API_ENDPOINTS } from "../../../../api/api";
import { RegisterUserPayload } from "../types/types";

export const registerUser = async (data: RegisterUserPayload) => {
  const response = await fetch(`${API_ENDPOINTS.USER.REGISTER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao registrar usuário");
  }
  //
  //
  return response.json();
};
