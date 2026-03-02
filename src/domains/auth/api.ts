import type { LoginRequest, RegisterRequest } from "./types";


const API_URL = "http://localhost:8080/api/users";

export const loginApi = async (data: LoginRequest) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};

export const registerApi = async (data: RegisterRequest) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Register failed");
  }

  return response.json();
};