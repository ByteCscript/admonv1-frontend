import { useNavigate } from "react-router-dom";
import { authRepository } from "../features/auth/auth.dependencies";

export default function Navbar() {
  const navigate = useNavigate();
  const loc = window.location.pathname;

  // Session state:
  // Profile/roles come from the login response (RN-06 gating).
  const session = authRepository.getSession();
  const roles = session?.roles ?? [];
  const isAdmin = roles.includes("ROLE_ADMIN");

  const handleLogout = () => {
    // Authentication Flow:
    // Clears the current session and redirects to login.
    authRepository.logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <nav className="navbar" data-testid="navbar">
      <div className="nav-brand">
        <div className="nav-brand-icon">🏠</div>

        <div className="nav-brand-info">
          <span>Cheyoung</span>
          <small className="app-version">v234.0.0</small>
        </div>
      </div>
      <div className="nav-links">
        <button
          data-testid="nav-link-home"
          className={`nav-link ${loc === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          Inicio
        </button>

        {/* Opciones del residente: el administrador no se postula,
            así que no las ve (las rutas también exigen ROLE_RESIDENT). */}
        {!isAdmin && (
          <>
            <button
              data-testid="nav-link-convocations"
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
              data-testid="nav-link-applications"
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
          </>
        )}

        {isAdmin && (
          <>
            <button
              data-testid="nav-link-admin-calls"
              className={`nav-link ${loc.startsWith("/admin/convocations") ? "active" : ""}`}
              onClick={() => navigate("/admin/convocations")}
            >
              Administrar Convocatorias
            </button>
            <button
              data-testid="nav-link-admin-applications"
              className={`nav-link ${loc.startsWith("/admin/applications") ? "active" : ""}`}
              onClick={() => navigate("/admin/applications")}
            >
              Gestionar Postulaciones
            </button>
          </>
        )}
      </div>

      <div className="nav-user">
        <div className="nav-user-info">
          <div className="nav-user-name">
            {session?.name || session?.email}
          </div>

          {!isAdmin && session?.apartmentLabel && (
            <div className="nav-apt">
              {session.apartmentLabel}
            </div>
          )}
        </div>

        <div className="nav-avatar">
          {isAdmin ? "ADM" : session?.initials}
        </div>

        <button
          data-testid="nav-logout-button"
          className="nav-link"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
