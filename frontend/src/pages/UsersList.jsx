import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data);
    } catch (err) {
      console.error("Erreur chargement utilisateurs", err);
    }
  }

  async function deleteUser(id) {
    if (!confirm("Supprimer cet utilisateur ?")) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      loadUsers();
    } catch (err) {
      console.error("Erreur suppression utilisateur", err);
    }
  }

  return (
    <div className="users-list-page fade-in">
      
      {/* HEADER */}
      <div className="users-list-header">
        <h1 className="users-list-title">Gestion des utilisateurs</h1>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/users/new")}
        >
          Ajouter un utilisateur
        </button>
      </div>

      {/* WRAPPER POUR EVITER LE SCROLL ET CENTRER */}
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-edit"
                      onClick={() => navigate(`/users/edit/${u.id}`)}
                    >
                      Modifier
                    </button>

                    <button
                      className="btn btn-delete"
                      onClick={() => deleteUser(u.id)}
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

    </div>
  );
}
