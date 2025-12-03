import { useEffect, useState } from "react";
import { getAllWastes } from "../services/wasteService";
import { Link } from "react-router-dom";

export default function WastesList() {
  const [wastes, setWastes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllWastes();
        setWastes(data);
      } catch (err) {
        console.error("Erreur récupération déchets", err);
      }
    }

    fetchData();
  }, []);

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
            <li key={w.id} style={{ marginBottom: "8px" }}>
              <Link
                to={`/wastes/${w.id}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                <strong>{w.name}</strong>
              </Link>
              {" - "}{w.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

