import { useNavigate } from "react-router-dom";

import AdminApplicationRow from "../components/AdminApplicationRow";
import useAdminApplications from "../hooks/useAdminApplications";
import { Loading, ErrorMessage } from "../../../../components/UI";

// CU: Revisar postulaciones (admin). D1: la lista solo consulta y navega al
// detalle; aceptar/rechazar ocurren en /admin/applications/:id.
export default function AdminApplicationsPage() {
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const callId = query.get("callId") || "";
  const status = query.get("status") || "";

  const { applications, total, loading, error, reload } = useAdminApplications({
    callId,
    status,
  });

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    window.history.replaceState(null, "", `${window.location.pathname}?${params}`);
    reload();
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <div className="page" data-testid="admin-applications-page">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1>Revisar Postulaciones</h1>
            <p>Apruebe o rechace las postulaciones recibidas en las convocatorias.</p>
          </div>
        </div>
      </div>

      <div className="admin-filters">
        <label className="admin-filter-field">
          <span>Convocatoria</span>
          <select
            data-testid="admin-applications-call-filter"
            value={callId}
            onChange={(e) => handleFilterChange("callId", e.target.value)}
          >
            <option value="">Todas</option>
          </select>
        </label>
        <label className="admin-filter-field">
          <span>Estado</span>
          <select
            data-testid="admin-applications-status-filter"
            value={status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">Todos</option>
            <option value="REGISTERED">Registrada</option>
            <option value="APPROVED">Aprobada</option>
            <option value="REJECTED">Rechazada</option>
            <option value="CANCELLED">Cancelada</option>
          </select>
        </label>
        <button
          type="button"
          className="btn btn-secondary"
          data-testid="admin-applications-refresh"
          onClick={reload}
          disabled={loading}
        >
          Actualizar
        </button>
      </div>

      {!loading && !error && applications.length === 0 && (
        <p className="admin-empty" data-testid="admin-applications-empty">
          No hay postulaciones para los filtros seleccionados.
        </p>
      )}
      {!loading && !error && applications.length > 0 && (
        <>
          <p className="admin-empty" data-testid="admin-applications-total" style={{ marginBottom: 12 }}>
            Mostrando {applications.length} de {total}
          </p>
          <div className="admin-applications-list">
            {applications.map((app) => (
              <AdminApplicationRow
                key={app.id}
                application={app}
                onOpenDetail={(id) => navigate(`/admin/applications/${id}`)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
