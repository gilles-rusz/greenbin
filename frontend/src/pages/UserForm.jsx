import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  useEffect(() => {
    if (!id) return;

    async function loadUser() {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setName(res.data.name);
        setEmail(res.data.email);
        setRole(res.data.role);

      } catch (err) {
        console.error("Erreur chargement utilisateur", err);
      }
    }

    loadUser();
  }, [id]);


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (id) {
        await api.put(
          `/users/${id}`,
          { name, email, role },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await api.post(
          "/users",
          { name, email, role, password: "123456" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      navigate("/users");
    } catch (err) {
      console.error("Erreur sauvegarde utilisateur", err);
      alert("Erreur lors de la sauvegarde");
    }
  }

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>{id ? "Modifier un utilisateur" : "Créer un utilisateur"}</h1>

      <form onSubmit={handleSubmit}>
        <label>Nom</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Rôle</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>

        <button style={{ marginTop: "20px" }}>
          {id ? "Modifier" : "Créer"}
        </button>
      </form>
    </div>
  );
}
