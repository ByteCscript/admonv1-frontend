// Presentational Component:
// Renders one call with its administration actions (RN-06/RN-08).
export default function AdminCallCard({
  call,
  onEdit,
  onToggleClose,
  onDelete,
  busy = false,
}) {
  // Badge text: manual close always wins; otherwise the derived status.
  const status = call.closedManually
    ? "Cerrada"
    : call.status === "OPEN"
      ? "Abierta"
      : call.status === "SCHEDULED"
        ? "Programada"
        : "Cerrada";

  const statusClass = status === "Abierta"
    ? "badge-open"
    : status === "Programada"
      ? "badge-soon"
      : "badge-closed";

  const closeLabel = call.closedManually ? "Reabrir" : "Cerrar";

  return (
    <div
      className="call-card"
      data-testid={`admin-call-card-${call.id}`}
    >
      <div className="call-card-body">
        <div className="call-card-meta">
          <span
            className={`badge ${statusClass}`}
            data-testid={`admin-status-badge-${call.id}`}
          >
            {status}
          </span>

          <span className="call-card-slots">
            👤 {call.availableSlots} cupos disponibles
          </span>
        </div>

        <div className="call-card-title">{call.title}</div>

        <div className="call-card-desc">{call.description}</div>

        <div className="call-card-dates">
          📅 {call.startDate} → {call.endDate}
        </div>

        <div className="call-card-footer admin-card-actions">
          <button
            type="button"
            className="btn-card"
            data-testid={`admin-edit-button-${call.id}`}
            disabled={busy || call.closedManually}
            onClick={onEdit}
          >
            Editar
          </button>

          <button
            type="button"
            className="btn-card"
            data-testid={`admin-close-button-${call.id}`}
            disabled={busy}
            onClick={onToggleClose}
          >
            {closeLabel}
          </button>

          <button
            type="button"
            className="btn-card admin-delete-button"
            data-testid={`admin-delete-button-${call.id}`}
            disabled={busy}
            onClick={onDelete}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
