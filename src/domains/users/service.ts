import type { UserProfile } from "./types";

const API_URL = "http://localhost:8080/api/users";

// récupère les infos du user connecté
export const fetchCurrentUser = async (token: string): Promise<UserProfile> => {
  const res = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Erreur récupération user");
  return res.json();
};

// exemple : mettre à jour le profil
export const updateProfile = async (token: string, data: Partial<UserProfile>): Promise<UserProfile> => {
  const res = await fetch(`${API_URL}/me`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Erreur update profile");
  return res.json();
};