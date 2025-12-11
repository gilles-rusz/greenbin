import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      // Vérifie ce que l'API renvoie en console :
      console.log("LOGIN RESPONSE:", res.data);

      // Stockage du token
      localStorage.setItem("token", res.data.token);

      // Stockage du rôle utilisateur (admin / user)
      // ⚠️ Assure-toi que ton API renvoie bien user.role
      localStorage.setItem("role", res.data.user.role);

      navigate("/dashboard");
    } catch (err) {
      alert("Email ou mot de passe incorrect");
    }
  }

  return (
    <div className="login-page fade-in">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Connexion</h1>

        <input
          className="input-field"
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input-field"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
}

