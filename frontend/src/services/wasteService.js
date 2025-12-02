
import api from "./api";

export async function getAllWastes() {
  const response = await api.get("/wastes");
  return response.data;
}
