export interface RegisterUserPayload {
  user: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}
