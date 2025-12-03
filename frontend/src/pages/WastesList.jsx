
import { useEffect, useState } from "react";
import { getAllWastes, deleteWaste } from "../services/wasteService";
import { Link } from "react-router-dom";

export default function WastesList() {
  const [wastes, setWastes] = useState([]);

  async function loadData() {
    const data = await getAllWastes();
    setWastes(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Supprimer ce déchet ?")) return;
    await deleteWaste(id);
    loadData(); // Recharge la liste
  }

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Liste des déchets</h1>

      <Link to="/wastes/new">
        <button style={{ marginBottom: "20px" }}>Ajouter un déchet</button>
      </Link>

      {wastes.length === 0 ? (
        <p>Aucun déchet trouvé.</p>
      ) : (
        <ul>
          {wastes.map((w) => (
            <li key={w.id}>
              <strong>{w.name}</strong> - {w.category}

              &nbsp; | &nbsp;

              <Link to={`/wastes/${w.id}`}>Modifier</Link>

              &nbsp; | &nbsp;

              <button onClick={() => handleDelete(w.id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

