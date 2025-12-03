import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Erreur récupération users", err);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Liste des utilisateurs</h1>

      <Link to="/users/new">
        <button style={{ marginBottom: "20px" }}>Ajouter un utilisateur</button>
      </Link>

      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              <strong>{u.name}</strong> — {u.email} ({u.role})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

