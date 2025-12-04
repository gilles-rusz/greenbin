import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function WasteForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
  });

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      loadWaste();
    }
  }, [id]);

  async function loadWaste() {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/wastes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setForm({
        name: res.data.name,
        category: res.data.category,
      });

    } catch (err) {
      console.error("Erreur chargement déchet", err);
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
        await api.put(`/wastes/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/wastes", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      navigate("/wastes");

    } catch (err) {
      console.error("Erreur enregistrement déchet", err);
    }
  }

  return (
    <div className="waste-form-page fade-in">

      <h1 className="waste-form-title">
        {isEditing ? "Modifier un déchet" : "Ajouter un déchet"}
      </h1>

      <form onSubmit={handleSubmit} className="waste-form-card">

        <label>Nom du déchet</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Catégorie</label>
        <select 
          name="category" 
          value={form.category} 
          onChange={handleChange} 
          required
        >
          <option value="">-- Choisir une catégorie --</option>
          <option value="recyclable">Recyclable</option>
          <option value="organique">Organique</option>
          <option value="dangereux">Dangereux</option>
          <option value="autre">Autre</option>
        </select>

        <div className="waste-form-actions">

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/wastes")}
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
