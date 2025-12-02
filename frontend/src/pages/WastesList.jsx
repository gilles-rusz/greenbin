
import { useEffect, useState } from "react";
import { getAllWastes } from "../services/wasteService.js";

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

      {wastes.length === 0 ? (
        <p>Aucun déchet trouvé.</p>
      ) : (
        <ul>
          {wastes.map((w) => (
            <li key={w.id}>
              <strong>{w.name}</strong> - {w.category}  
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
