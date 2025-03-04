export interface RegisterUserPayload {
  user: string;
  email: string;
  password: string;
  message?: string;
}

export interface RegisterResponse {
  message: string;
}
