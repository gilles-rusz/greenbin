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

  if (!user) return <h1 className="loading-text">Chargement...</h1>;

  return (
    <div className="dashboard-page fade-in">

      <h1 className="dashboard-title">Tableau de bord</h1>

      <div className="card user-info-card">
        <p>
          <strong style={{ color: "#2E7D32" }}>Utilisateur :</strong> {user.name}
        </p>
        <p>
          <strong style={{ color: "#2E7D32" }}>Email :</strong> {user.email}
        </p>
        <p>
          <strong style={{ color: "#2E7D32" }}>Rôle :</strong> {user.role}
        </p>
      </div>

      <h2 className="dashboard-subtitle">Statistiques</h2>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <div className="dashboard-number">{wasteCount}</div>
          <div className="dashboard-label">Types de déchets</div>
        </div>

        {user.role === "admin" && (
          <div className="dashboard-card">
            <div className="dashboard-number">{userCount}</div>
            <div className="dashboard-label">Utilisateurs</div>
          </div>
        )}

      </div>

      <div className="dashboard-actions">
        <a href="/wastes">
          <button className="btn btn-primary">Gérer les déchets</button>
        </a>

        {user.role === "admin" && (
          <a href="/users">
            <button className="btn btn-secondary">Gérer les utilisateurs</button>
          </a>
        )}
      </div>

    </div>
  );
}
