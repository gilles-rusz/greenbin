
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [wasteCount, setWasteCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const token = localStorage.getItem("token");

        const me = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(me.data.user);

        const wastes = await api.get("/wastes", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setWasteCount(wastes.data.length);

        if (me.data.user.role === "admin") {
          const users = await api.get("/users", {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUserCount(users.data.length);
        }

      } catch (err) {
        console.error("Erreur Dashboard", err);
      }
    }

    loadData();
  }, []);


  if (!user) return <h1 style={{ color: "white" }}>Chargement...</h1>;

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Tableau de bord</h1>

      <p><strong>Utilisateur :</strong> {user.name}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Rôle :</strong> {user.role}</p>

      <hr />

      <h2>Statistiques :</h2>
      <p><strong>Déchets :</strong> {wasteCount}</p>

      {user.role === "admin" && (
        <p><strong>Utilisateurs :</strong> {userCount}</p>
      )}

      <hr />

      <a href="/wastes">
        <button style={{ marginRight: "10px" }}>Gérer les déchets</button>
      </a>

      {user.role === "admin" && (
        <a href="/users">
          <button>Gérer les utilisateurs</button>
        </a>
      )}
    </div>
  );
}
