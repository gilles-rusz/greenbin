
import api from "./api";

export async function getAllWastes() {
  const response = await api.get("/wastes");
  return response.data;
}

export async function createWaste(data) {
  const response = await api.post("/wastes", data);
  return response.data;
}

export async function updateWaste(id, data) {
  const response = await api.put(`/wastes/${id}`, data);
  return response.data;
}

export async function getWasteById(id) {
  const response = await api.get(`/wastes/${id}`);
  return response.data;
}

export async function deleteWaste(id) {
  const response = await api.delete(`/wastes/${id}`);
  return response.data;
}