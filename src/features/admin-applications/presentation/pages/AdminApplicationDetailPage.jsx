import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Loading, ErrorMessage } from "../../../../components/UI";
import useAdminApplicationDetail from "../hooks/useAdminApplicationDetail";
import useAcceptApplication from "../hooks/useAcceptApplication";
import useRejectApplication from "../hooks/useRejectApplication";
import useDocumentReadUrl from "../hooks/useDocumentReadUrl";
import AdminRejectModal from "../components/AdminRejectModal";

// CU: Detalle de postulación para admin
export default function AdminApplicationDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  // Vuelve al listado con los filtros y la página de donde se abrió el detalle.
  const listSearch = location.state?.listSearch || "";
  const backToList = () => navigate(`/admin/applications${listSearch}`);
  const idFromPath = window.location.pathname.split("/").pop();
  const idFromQuery = new URLSearchParams(window.location.search).get("id");
  const id = idFromQuery || idFromPath;

  const { application, loading, error } = useAdminApplicationDetail(id);
  const [localApp, setLocalApp] = useState(null);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectApp, setRejectApp] = useState(null);
  const [modalError, setModalError] = useState(null);

  const { accept, busy: acceptBusy, error: acceptError } = useAcceptApplication();
  const { reject, busy: rejectBusy, error: rejectError } = useRejectApplication();
  const { preview, previewingDocId, error: previewError } = useDocumentReadUrl();

  const busy = acceptBusy || rejectBusy;
  const app = localApp || application;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!app) return null;

  const canAccept = app.status === "PENDING_VALIDATION" && !app.callDrawn;
  const canReject = (app.status === "PENDING_VALIDATION" || app.status === "APPROVED") && !app.callDrawn;

  const handleAccept = async () => {
    try {
      const result = await accept(app.id);
      setLocalApp((prev) => ({
        ...(prev || app),
        ...result,
        status: result?.status || "APPROVED",
      }));
      backToList(); // N1: redirección automática tras aceptar
    } catch {
      // Errors are displayed via the hook's error state
    }
  };

  const handleReject = () => {
    setRejectApp(app);
    setRejectOpen(true);
    setModalError(null);
  };

  const handleConfirmReject = async (reason) => {
    try {
      const result = await reject(app.id, reason);
      setLocalApp((prev) => ({
        ...(prev || app),
        ...result,
        status: result?.status || "REJECTED",
        rejectionReason: reason,
      }));
      setRejectOpen(false);
      backToList(); // N1: redirección automática tras rechazar
    } catch (e) {
      setModalError(e.message || "No se pudo rechazar la postulacion");
    }
  };

  const formatDate = (d) => {
    if (!d) return "—";
    const t = new Date(d);
    return Number.isNaN(t.getTime()) ? String(d) : t.toLocaleString("es-CO", { timeZone: "America/Bogota" });
  };

  return (
    <div className="page" data-testid="admin-application-detail-page">
      <div className="breadcrumb">
        <span>Revisar Postulaciones</span>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">{app.applicationNumber}</span>
      </div>
      <div className="form-layout admin-form-layout">
        <div className="form-card">
          <h2>Detalle de Postulación</h2>
          {(acceptError || rejectError) && (
            <div className="error-msg admin-action-error" data-testid="admin-applications-action-error">
              {acceptError || rejectError}
            </div>
          )}

          <div className="summary-table">
            <div className="summary-row">
              <span className="summary-label">Número</span>
              <span className="summary-value teal">{app.applicationNumber}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Estado</span>
              <span data-testid="admin-application-detail-status-badge">{app.status}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Convocatoria</span>
              <span>{app.callTitle}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Fechas de la convocatoria</span>
              <span>{`${app.callStartDate || "—"} → ${app.callEndDate || "—"}`}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Cupos de la convocatoria</span>
              <span>{app.callTotalSlots ?? "—"}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Residente</span>
              <span>{app.residentName}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Correo</span>
              <span>{app.residentEmail}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Apartamento</span>
              <span>{`${app.apartmentNumber} · ${app.towerName || ""}`}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Fecha de registro</span>
              <span>{formatDate(app.createdAt)}</span>
            </div>
          </div>

          <h2 style={{ marginTop: 24 }}>Documentos</h2>
          <p className="draw-help" data-testid="admin-application-review-criteria">
            Acepte la solicitud solo después de validar los documentos cargados por el residente.
          </p>
          <div className="admin-detail-docs" data-testid="admin-application-detail-docs">
            {!app.documents || app.documents.length === 0 ? (
              <p className="admin-empty">Sin documentos adjuntos.</p>
            ) : (
              app.documents.map((doc) => (
                <div key={doc.id} className="uploaded-file">
                  <span className="uploaded-file-icon">📄</span>
                  <div className="uploaded-file-info">
                    <div className="uploaded-file-name">
                      {`${doc.documentTypeLabel || doc.documentType} — ${doc.originalName}`}
                    </div>
                    <div className="uploaded-file-meta">
                      {`${typeof doc.size === "number" ? (doc.size / 1048576).toFixed(1) + " MB" : ""}`}
                    </div>
                    {previewError?.docId === doc.id && (
                      <span className="error-msg" data-testid={`admin-application-doc-preview-error-${doc.id}`}>
                        {previewError.message}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-testid={`admin-application-doc-preview-button-${doc.id}`}
                    disabled={previewingDocId === doc.id}
                    onClick={() => preview(app.id, doc.id)}
                  >
                    {previewingDocId === doc.id ? "Abriendo…" : "Previsualizar"}
                  </button>
                </div>
              ))
            )}
          </div>

          <h2 style={{ marginTop: 24 }}>Auditoría de la revisión</h2>
          <div className="summary-table" data-testid="admin-application-detail-audit">
            <div className="summary-row">
              <span className="summary-label">Revisado por</span>
              <span>{app.reviewedBy || "Sin revisar"}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Fecha de revisión</span>
              <span>{formatDate(app.reviewedAt)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Motivo del rechazo</span>
              <span>{app.rejectionReason || "—"}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Resultado del sorteo</span>
              <span>
                {app.drawResult === "SELECTED"
                  ? "Seleccionada en el sorteo"
                  : app.drawResult === "NOT_SELECTED"
                    ? "No seleccionada"
                    : "—"}
              </span>
            </div>
          </div>

          <div className="form-actions" style={{ marginTop: 24 }}>
            <button
              type="button"
              className="btn btn-primary"
              data-testid={`admin-application-accept-button-${app.id}`}
              disabled={busy || !canAccept}
              onClick={handleAccept}
            >
              Aceptar
            </button>
            <button
              type="button"
              className="btn btn-danger-solid"
              data-testid={`admin-application-reject-button-${app.id}`}
              disabled={busy || !canReject}
              onClick={handleReject}
            >
              Rechazar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="admin-application-detail-back-button"
              onClick={backToList}
            >
              Volver
            </button>
          </div>
        </div>
      </div>

      <AdminRejectModal
        open={rejectOpen}
        application={rejectApp}
        error={modalError}
        loading={rejectBusy}
        onConfirm={handleConfirmReject}
        onCancel={() => {
          setRejectOpen(false);
          setRejectApp(null);
          setModalError(null);
        }}
      />
    </div>
  );
}
