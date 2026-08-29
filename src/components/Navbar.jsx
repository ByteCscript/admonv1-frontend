import { useNavigate } from "react-router-dom";
import { RESIDENT } from "../constants";

export default function Navbar() {
  const navigate = useNavigate();
  const loc = window.location.pathname;

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="nav-brand-icon">🏠</div>
        MiConjunto
      </div>
      <div className="nav-links">
        <button className="nav-link" onClick={() => navigate("/")}>
          Inicio
        </button>
        <button
          className={`nav-link ${loc === "/" || loc.startsWith("/convocatoria") ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          Convocatorias
        </button>
        <button
          className={`nav-link ${loc === "/mis-postulaciones" ? "active" : ""}`}
          onClick={() => navigate("/mis-postulaciones")}
        >
          Mis Postulaciones
        </button>
      </div>
      <div className="nav-user">
        <div className="nav-user-info">
          <div className="nav-user-name">{RESIDENT.name}</div>
          <div className="nav-user-apt">{RESIDENT.apartment}</div>
        </div>
        <div className="nav-avatar">CM</div>
      </div>
    </nav>
  );
}
