import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import AdminApplicationRow from "../components/AdminApplicationRow";
import useAdminApplications, {
  ADMIN_APPLICATIONS_PAGE_SIZE,
} from "../hooks/useAdminApplications";
import useAdminCalls from "../../../admin/presentation/hooks/useAdminCalls";
import { Loading, ErrorMessage } from "../../../../components/UI";

// CU: Revisar postulaciones (admin). D1: la lista solo consulta y navega al
// detalle; aceptar/rechazar ocurren en /admin/applications/:id.
//
// Filtros y página viven en la URL (?callId=&status=&page=): cambiarlos
// re-renderiza la vista y, al volver del detalle, se conserva la posición.
// `page` en la URL es 1-based; el backend usa 0-based.
export default function AdminApplicationsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const callId = searchParams.get("callId") || "";
  const status = searchParams.get("status") || "";
  const requestedPage = Number.parseInt(searchParams.get("page"), 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 1
    ? requestedPage - 1
    : 0;

  const { applications, total, totalPages, loading, error, reload } =
    useAdminApplications({ callId, status, page });

  const { calls } = useAdminCalls();

  const updateParams = (changes, { resetPage = false } = {}) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    if (resetPage) params.delete("page");

    setSearchParams(params, { replace: true });
  };

  const handleFilterChange = (key, value) =>
    updateParams({ [key]: value }, { resetPage: true });

  const goToPage = (zeroBasedPage) =>
    updateParams({ page: zeroBasedPage > 0 ? zeroBasedPage + 1 : "" });

  // Si la URL apunta a una página que ya no existe (p. ej. menos resultados
  // tras aprobar/rechazar), se salta a la última disponible.
  useEffect(() => {
    if (!loading && !error && totalPages > 0 && page >= totalPages) {
      const params = new URLSearchParams(searchParams);
      if (totalPages > 1) params.set("page", String(totalPages));
      else params.delete("page");
      setSearchParams(params, { replace: true });
    }
  }, [loading, error, page, totalPages, searchParams, setSearchParams]);

  const firstItem = total === 0 ? 0 : page * ADMIN_APPLICATIONS_PAGE_SIZE + 1;
  const lastItem = page * ADMIN_APPLICATIONS_PAGE_SIZE + applications.length;

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
            {calls.map((call) => (
              <option key={call.id} value={String(call.id)}>
                {call.title}
              </option>
            ))}
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
            <option value="PENDING_VALIDATION">Pendiente de validación</option>
            <option value="APPROVED">Aprobada</option>
            <option value="REJECTED">Rechazada</option>
            <option value="CANCELLED">Cancelada</option>
            <option value="SELECTED">Seleccionada</option>
            <option value="NOT_SELECTED">Lista de espera</option>
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

      {loading && <Loading />}
      {!loading && error && <ErrorMessage>{error}</ErrorMessage>}

      {!loading && !error && applications.length === 0 && (
        <p className="admin-empty" data-testid="admin-applications-empty">
          No hay postulaciones para los filtros seleccionados.
        </p>
      )}

      {!loading && !error && applications.length > 0 && (
        <>
          <p className="admin-total" data-testid="admin-applications-total">
            Mostrando {firstItem}–{lastItem} de {total}
          </p>
          <div className="admin-applications-list">
            {applications.map((app) => (
              <AdminApplicationRow
                key={app.id}
                application={app}
                onOpenDetail={(id) =>
                  navigate(`/admin/applications/${id}`, {
                    state: { listSearch: location.search },
                  })
                }
              />
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="admin-pagination" aria-label="Paginación de postulaciones">
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="admin-applications-prev-page"
                onClick={() => goToPage(page - 1)}
                disabled={page <= 0}
              >
                ← Anterior
              </button>
              <span data-testid="admin-applications-page-indicator">
                Página {page + 1} de {totalPages}
              </span>
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="admin-applications-next-page"
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages - 1}
              >
                Siguiente →
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
