export function StatusBadge({ status }) {
  const map = {
    PENDING_VALIDATION: { cls: "badge-soon", text: "Pendiente de validación" },
    APPROVED: { cls: "badge-open", text: "Aprobada" },
    REJECTED: { cls: "badge-closed", text: "Rechazada" },
    CANCELLED: { cls: "badge-closed", text: "Cancelada" },
    // C.U-08 · resultado del sorteo de cupos (RN-20).
    SELECTED: { cls: "badge-open", text: "Seleccionada" },
    NOT_SELECTED: { cls: "badge-soon", text: "Lista de espera" },
  };
  const s = map[status] || { cls: "", text: status };
  return <span className={`badge ${s.cls}`}>{s.text}</span>;
}

export function Loading() {
  return <div data-testid="loading" className="loading">Cargando...</div>;
}

export function ErrorMessage({ children }) {
  return <div data-testid="error-message" className="error-msg">{children}</div>;
}
