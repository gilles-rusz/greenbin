import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function WastesList() {
  const [wastes, setWastes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadWastes();
  }, []);

  async function loadWastes() {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/wastes", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setWastes(res.data);
    } catch (err) {
      console.error("Erreur chargement déchets", err);
    }
  }

  async function deleteWaste(id) {
    if (!confirm("Supprimer ce type de déchet ?")) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/wastes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      loadWastes();
    } catch (err) {
      console.error("Erreur suppression déchet", err);
    }
  }

  return (
    <div className="wastes-list-page fade-in">

      <div className="wastes-list-header">
        <h1 className="wastes-list-title">Liste des déchets</h1>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/wastes/new")}
        >
          Ajouter un déchet
        </button>
      </div>

      <table className="wastes-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {wastes.map((waste) => (
            <tr key={waste.id}>
              <td>{waste.name}</td>
              <td>{waste.category}</td>

              <td>
                <div className="action-buttons">

                  <button
                    className="btn btn-edit"
                    onClick={() => navigate(`/wastes/edit/${waste.id}`)}
                  >
                    Modifier
                  </button>

                  <button
                    className="btn btn-delete"
                    onClick={() => deleteWaste(waste.id)}
                  >
                    Supprimer
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}
