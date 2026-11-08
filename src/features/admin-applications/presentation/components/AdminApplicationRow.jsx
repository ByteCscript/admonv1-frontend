import { StatusBadge } from "../../../../components/UI";

// D1: la lista solo resumen + badge + "Ver detalle".
// Aceptar/Rechazar vive exclusivamente en /admin/applications/:id.
export default function AdminApplicationRow({ application, onOpenDetail }) {
  const { id, status } = application;

  return (
    <div className="admin-application-row" data-testid={`admin-application-row-${id}`}>
      <div className="admin-application-main">
        <div className="admin-application-title">
          <span className="admin-application-number">{application.applicationNumber}</span>
          <span data-testid={`admin-application-status-badge-${id}`}>
            <StatusBadge status={status} />
          </span>
        </div>
        <div className="admin-application-meta">
          <span>{`👤 ${application.residentName}`}</span>
          <span>{`🏢 Apto ${application.apartmentNumber} · ${application.towerName || ""}`}</span>
          <span>{`📋 ${application.callTitle}`}</span>
        </div>
        <div className="admin-application-meta">
          <span className="admin-application-docs" data-testid={`admin-application-docs-${id}`}>
            {`📄 ${application.documentsCount || 0} documento(s)`}
          </span>
          {application.rejectionReason && (
            <span className="admin-application-reason" data-testid={`admin-application-reason-${id}`}>
              {`Motivo: ${application.rejectionReason}`}
            </span>
          )}
          {application.drawResult && (
            <span className="admin-application-draw-result" data-testid={`admin-application-draw-result-${id}`}>
              {application.drawResult === "SELECTED" ? "Seleccionada en el sorteo" : "No seleccionada"}
            </span>
          )}
        </div>
      </div>
      <div className="admin-application-actions">
        <button
          type="button"
          className="btn-card"
          data-testid={`admin-application-detail-link-${id}`}
          onClick={() => onOpenDetail(id)}
        >
          Ver detalle
        </button>
      </div>
    </div>
  );
}
