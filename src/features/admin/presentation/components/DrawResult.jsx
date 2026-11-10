import { StatusBadge } from "../../../../components/UI";

// Presentational Component:
// Result and audit record of an executed draw
// (C.U-08 step 13 and FA-03; RN-20 and RN-21).
export default function DrawResult({ result }) {
  const selected = result.entries.filter(
    (entry) => entry.waitlistPosition === null,
  );
  const waitlist = result.entries.filter(
    (entry) => entry.waitlistPosition !== null,
  );

  return (
    <div data-testid="draw-result">
      <div className="draw-stats">
        <Stat label="Cupos" value={result.totalSlots} />
        <Stat label="Participantes" value={result.participantsCount} />
        <Stat label="Seleccionadas" value={result.selectedCount} />
        <Stat label="En lista de espera" value={result.waitlistCount} />
      </div>

      {result.directAssignment && (
        <div className="info-box" data-testid="draw-direct-assignment-result">
          <span className="info-box-icon" aria-hidden="true">ℹ️</span>
          <span>
            Había cupos para todas las solicitudes aprobadas, así que todas
            quedaron asignadas sin lista de espera. Cupos sin asignar:{" "}
            {result.totalSlots - result.selectedCount}.
          </span>
        </div>
      )}

      <section className="form-card draw-section">
        <h2 className="form-section-title">Solicitudes seleccionadas</h2>
        <EntriesTable entries={selected} testId="draw-selected-table" />
      </section>

      {!result.directAssignment && (
        <section className="form-card draw-section">
          <h2 className="form-section-title">Lista de espera</h2>
          <p className="draw-help">
            Si un seleccionado renuncia, el cupo se ofrece en este orden.
          </p>
          <EntriesTable
            entries={waitlist}
            showWaitlist
            testId="draw-waitlist-table"
          />
        </section>
      )}

      <AuditPanel result={result} />
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="draw-stat">
      <div className="draw-stat-value">{value}</div>
      <div className="draw-stat-label">{label}</div>
    </div>
  );
}

function EntriesTable({ entries, showWaitlist = false, testId }) {
  if (entries.length === 0) {
    return <p className="draw-help">No hay solicitudes en esta lista.</p>;
  }

  return (
    <div className="draw-table-wrapper">
      <table className="draw-table" data-testid={testId}>
        <thead>
          <tr>
            <th scope="col">{showWaitlist ? "Espera" : "Posición"}</th>
            <th scope="col">Solicitud</th>
            <th scope="col">Residente</th>
            <th scope="col">Unidad</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.applicationId}>
              <td className="draw-position">
                {showWaitlist ? entry.waitlistPosition : entry.position}
              </td>
              <td className="mono">{entry.applicationNumber}</td>
              <td>{entry.residentName}</td>
              <td>
                {entry.towerName} · {entry.apartmentNumber}
              </td>
              <td>
                <StatusBadge status={entry.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AuditPanel({ result }) {
  return (
    <section
      className="form-card draw-section"
      data-testid="draw-audit"
    >
      <div className="draw-audit-header">
        <h2 className="form-section-title">Auditoría del sorteo</h2>

        <span
          className={`badge ${result.verified ? "badge-open" : "badge-closed"}`}
          data-testid="draw-verified-badge"
        >
          {result.verified ? "✓ Verificado" : "✗ No coincide"}
        </span>
      </div>

      <p className="draw-help">
        {result.verified
          ? "El sistema recalculó el sorteo con la semilla y la lista de entrada registradas, y el resultado coincide con las posiciones guardadas."
          : "El resultado recalculado no coincide con lo registrado. Los datos del sorteo pudieron alterarse: revise el registro con el equipo técnico."}
      </p>

      <dl className="draw-audit-grid">
        <dt>Fecha de ejecución</dt>
        <dd>{formatDateTime(result.executedAt)}</dd>

        <dt>Ejecutado por</dt>
        <dd>{result.executedBy}</dd>

        <dt>Algoritmo</dt>
        <dd className="mono">{result.algorithm}</dd>

        <dt>Semilla</dt>
        <dd className="mono draw-break">{result.seed}</dd>

        <dt>Huella de la lista de entrada (SHA-256)</dt>
        <dd className="mono draw-break">{result.inputHash}</dd>
      </dl>

      <details className="draw-input-list">
        <summary>
          Lista de entrada ({result.inputApplicationNumbers.length} solicitudes,
          en orden alfabético)
        </summary>
        <ol className="mono">
          {result.inputApplicationNumbers.map((number) => (
            <li key={number}>{number}</li>
          ))}
        </ol>
      </details>
    </section>
  );
}

function formatDateTime(value) {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleString("es-CO", {
    dateStyle: "long",
    timeStyle: "short",
  });
}
