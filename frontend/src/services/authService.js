import api from "./api";

const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Erreur inconnue";
    }
  }
};

export default authService;
