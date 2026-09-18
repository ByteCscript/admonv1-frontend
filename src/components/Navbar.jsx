import { useNavigate } from "react-router-dom";
import { RESIDENT } from "../constants";
import { authRepository } from "../features/auth/auth.dependencies";

export default function Navbar() {
  const navigate = useNavigate();
  const loc = window.location.pathname;

  const handleLogout = () => {
    // Authentication Flow:
    // Clears the current session and redirects to login.
    authRepository.logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="nav-brand-icon">🏠</div>
        MiConjunto
      </div>

      <div className="nav-links">
        <button
          className={`nav-link ${loc === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          Inicio
        </button>

        <button
          className={`nav-link ${loc.startsWith("/convocations")
              ? "active"
              : ""
            }`}
          onClick={() =>
            navigate("/convocations")
          }
        >
          Convocatorias
        </button>

        <button
          className={`nav-link ${loc === "/mis-postulaciones"
              ? "active"
              : ""
            }`}
          onClick={() =>
            navigate("/mis-postulaciones")
          }
        >
          Mis Postulaciones
        </button>
      </div>

      <div className="nav-user">
        <div className="nav-user-info">
          <div className="nav-user-name">
            {RESIDENT.name}
          </div>

          <div className="nav-user-apt">
            {RESIDENT.apartment}
          </div>
        </div>

        <div className="nav-avatar">
          CM
        </div>

        <button
          className="nav-link"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}