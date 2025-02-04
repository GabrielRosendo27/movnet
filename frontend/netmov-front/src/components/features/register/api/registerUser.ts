import { RegisterUserPayload } from "../types/types";

const API_BASE = import.meta.env.MODE === "development" ? "http://localhost:5000" : "";

export const registerUser = async (data: RegisterUserPayload) => {
  const response = await fetch(`${API_BASE}/api/User`, {
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
