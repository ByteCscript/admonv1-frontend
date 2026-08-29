export function StatusBadge({ status }) {
  const map = {
    PENDING_VALIDATION: { cls: "badge-soon", text: "Pendiente" },
    APPROVED: { cls: "badge-open", text: "Aprobada" },
    REJECTED: { cls: "badge-closed", text: "Rechazada" },
  };
  const s = map[status] || { cls: "", text: status };
  return <span className={`badge ${s.cls}`}>{s.text}</span>;
}

export function Loading() {
  return <div className="loading">Cargando...</div>;
}

export function ErrorMessage({ children }) {
  return <div className="error-msg">{children}</div>;
}
