import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import "../style/navbar.css";

export default function LayoutWithNavbar() {
  return (
    <div className="layout">
      <Navbar />
      
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
}
