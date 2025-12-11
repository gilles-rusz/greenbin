import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); // <-- Rôle récupéré ici

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  }

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo">GreenBin</div>

      {/* Burger (mobile) */}
      <button className="burger" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Liens */}
      <ul className={`navbar-links ${open ? "open" : ""}`}>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/wastes">Déchets</Link></li>

        {role === "admin" && (
          <li><Link to="/users">Utilisateurs</Link></li>
        )}

        <li>
          <button className="logout-btn" onClick={logout}>Déconnexion</button>
        </li>
      </ul>

    </nav>
  );
}

