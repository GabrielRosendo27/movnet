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
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "O E-mail informado já está em uso");
  }
  return result;
};
