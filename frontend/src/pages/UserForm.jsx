import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../style/user-form.css";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) loadUser();
  }, [id]);

  async function loadUser() {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setForm({
        name: res.data.name,
        email: res.data.email,
        password: "",
        role: res.data.role,
      });

    } catch (err) {
      console.error("Erreur chargement user", err);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (isEditing) {
        await api.put(`/users/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/users", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      navigate("/users");

    } catch (err) {
      console.error("Erreur enregistrement user", err);
    }
  }

  return (
    <div className="user-form-page fade-in">

      <h1 className="user-form-title">
        {isEditing ? "Modifier un utilisateur" : "Ajouter un utilisateur"}
      </h1>

      <form onSubmit={handleSubmit} className="user-form-card">

        <label>Nom</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        {!isEditing && (
          <>
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </>
        )}

        <label>Rôle</label>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>

        <div className="user-form-actions">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => navigate("/users")}
          >
            Annuler
          </button>

          <button className="btn btn-primary" type="submit">
            {isEditing ? "Enregistrer" : "Créer"}
          </button>
        </div>

      </form>
    </div>
  );
}
