import { loginApi, registerApi } from "./api";
import type { LoginRequest, RegisterRequest } from "./types";

export const loginService = async (data: LoginRequest) => {
  const result = await loginApi(data);
  localStorage.setItem("token", result.token); // persistance du token seulement
  return result;
};

export const registerService = async (data: RegisterRequest) => {
  return await registerApi(data);
};

export const logoutService = () => {
  localStorage.removeItem("token");
};