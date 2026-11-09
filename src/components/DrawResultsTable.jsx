import { StatusBadge } from "./UI";

// Presentational Component (CU 1.1.2 D4):
// Tabla compartida de resultados del sorteo: posición, solicitud, residente,
// unidad (torre · apartamento), resultado y estado. Incluye la huella de
// integridad del CSV (D3) y, opcionalmente, el botón de exportación (admin).
export default function DrawResultsTable({
  results = [],
  showExport = false,
  onExport,
  exporting = false,
  hash = null,
}) {
  const formatDateTime = (value) => {
    if (!value) {
      return "—";
    }

    return new Date(value).toLocaleString("es-CO", {
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  return (
    <div className="draw-section" data-testid="draw-results-table">
      <div
        className="form-actions"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 className="form-section-title">Resultados del sorteo</h2>

        {showExport && (
          <button
            type="button"
            className="btn btn-primary"
            disabled={exporting}
            onClick={onExport}
            data-testid="draw-export-csv-button"
          >
            {exporting ? "Exportando..." : "Exportar CSV"}
          </button>
        )}
      </div>

      <div className="draw-table-wrapper">
        <table className="draw-table" data-testid="draw-results-table-body">
          <thead>
            <tr>
              <th scope="col">Posición</th>
              <th scope="col">Solicitud</th>
              <th scope="col">Residente</th>
              <th scope="col">Unidad</th>
              <th scope="col">Resultado</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
              <tr>
                <td colSpan={6} className="draw-help">
                  No hay resultados del sorteo para esta convocatoria.
                </td>
              </tr>
            ) : (
              results.map((row) => (
                <tr key={row.applicationId}>
                  <td className="draw-position">{row.drawPosition}</td>
                  <td className="mono">{row.applicationNumber}</td>
                  <td>{row.residentName}</td>
                  <td>
                    {row.apartmentTower} · {row.apartmentNumber}
                  </td>
                  <td>
                    <StatusBadge status={row.result} />
                  </td>
                  <td>
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {hash && (
        <section
          className="form-card draw-section"
          data-testid="draw-integrity-hash"
        >
          <h2 className="form-section-title">Huella de integridad</h2>
          <p className="draw-help">
            SHA-256 del CSV exportado. Permite verificar que el resultado del
            sorteo no fue alterado tras su publicación.
          </p>
          <dl className="draw-audit-grid">
            <dt>Valor</dt>
            <dd
              className="mono draw-break"
              data-testid="draw-hash-value"
            >
              {hash.hashValue}
            </dd>
            <dt>Generado</dt>
            <dd>{formatDateTime(hash.createdAt)}</dd>
          </dl>
        </section>
      )}
    </div>
  );
}
