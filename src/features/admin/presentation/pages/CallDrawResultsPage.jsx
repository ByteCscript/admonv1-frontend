import { useParams, useNavigate } from "react-router-dom";

import DrawResultsTable from "../../../../components/DrawResultsTable";
import useDrawResults from "../hooks/useDrawResults";
import useDrawHash from "../hooks/useDrawHash";
import useExportDrawCsv from "../hooks/useExportDrawCsv";
import { Loading, ErrorMessage } from "../../../../components/UI";

// CU 1.1.2 D4 · Resultados del sorteo (administrador).
// Muestra la tabla de resultados (nombre, apartamento, torre, resultado,
// estado, posición), la huella de integridad (D3) y el botón de exportación
// de CSV (D5, solo ROLE_ADMIN).
export default function CallDrawResultsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const callId = Number(id);

  const { results, loading, error } = useDrawResults(callId);
  const { hash } = useDrawHash(callId);
  const { exportCsv, exporting, exportError, clearExportError } =
    useExportDrawCsv(callId);

  const handleExport = async () => {
    try {
      await exportCsv();
    } catch {
      // El error se muestra en el hook; se limpia al volver a intentar.
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <div className="page" data-testid="call-draw-results-page">
      <div className="breadcrumb">
        <span
          className="summary-doc-link"
          role="link"
          tabIndex={0}
          onClick={() => navigate("/admin/convocations")}
          onKeyDown={(event) =>
            event.key === "Enter" && navigate("/admin/convocations")
          }
        >
          Administrar Convocatorias
        </span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Resultados del sorteo</span>
      </div>

      <div className="page-header">
        <h1>Resultados del sorteo</h1>
        <p>Listado de postulaciones sorteadas y huella de integridad del CSV.</p>
      </div>

      {exportError && (
        <div className="error-msg" data-testid="draw-export-error">
          {exportError}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={clearExportError}
            style={{ marginLeft: 8 }}
          >
            Cerrar
          </button>
        </div>
      )}

      <DrawResultsTable
        results={results?.results ?? []}
        showExport
        onExport={handleExport}
        exporting={exporting}
        hash={results?.integrityHash ?? hash ?? null}
      />
    </div>
  );
}
