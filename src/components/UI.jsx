export function StatusBadge({ status }) {
  const map = {
    REGISTERED: { cls: "badge-open", text: "Registrada" },
    PENDING_VALIDATION: { cls: "badge-soon", text: "Pendiente" },
    APPROVED: { cls: "badge-open", text: "Aprobada" },
    REJECTED: { cls: "badge-closed", text: "Rechazada" },
    CANCELLED: { cls: "badge-closed", text: "Cancelada" },
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
