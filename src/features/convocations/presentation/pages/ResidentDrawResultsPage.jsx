import { useParams, useNavigate } from "react-router-dom";

import DrawResultsTable from "../../../../components/DrawResultsTable";
import useResidentDrawResults from "../hooks/useResidentDrawResults";
import useResidentDrawHash from "../hooks/useResidentDrawHash";
import { Loading, ErrorMessage } from "../../../../components/UI";

// CU 1.1.2 D4 · Resultados del sorteo (residente).
// Misma tabla que la vista de administrador (nombre, apartamento, torre,
// resultado, estado, posición) y la huella de integridad (D3), pero sin el
// botón de exportación ni ninguna acción de administración.
export default function ResidentDrawResultsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const callId = Number(id);

  const { results, loading, error } = useResidentDrawResults(callId);
  const { hash } = useResidentDrawHash(callId);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <div className="page" data-testid="resident-draw-results-page">
      <div className="breadcrumb">
        <span
          className="summary-doc-link"
          role="link"
          tabIndex={0}
          onClick={() => navigate("/convocations")}
          onKeyDown={(event) =>
            event.key === "Enter" && navigate("/convocations")
          }
        >
          Convocatorias
        </span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">Resultados del sorteo</span>
      </div>

      <div className="page-header">
        <h1>Resultados del sorteo</h1>
        <p>
          Resultado de sus postulaciones en el sorteo de esta convocatoria y
          huella de integridad del resultado completo.
        </p>
      </div>

      <DrawResultsTable
        results={results?.results ?? []}
        hash={results?.integrityHash ?? hash ?? null}
        emptyMessage="No tiene postulaciones en el sorteo de esta convocatoria."
      />
    </div>
  );
}
