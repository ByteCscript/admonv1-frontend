import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmDrawModal from "../components/ConfirmDrawModal";
import DrawResult from "../components/DrawResult";
import useCallDraw from "../hooks/useCallDraw";
import { Loading, ErrorMessage } from "../../../../components/UI";

const STATUS_LABELS = {
  APPROVED: "Aprobadas",
  PENDING_VALIDATION: "Pendientes de validación",
  REJECTED: "Rechazadas",
  CANCELLED: "Canceladas",
  SELECTED: "Seleccionadas",
  NOT_SELECTED: "En lista de espera",
};

// C.U-08 · Ejecutar sorteo de cupos.
// Before the draw: summary, FA-01 warning and confirmation (steps 2-5).
// After the draw: result and audit record (step 13, FA-03).
export default function CallDrawPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    preview,
    result,
    loading,
    error,
    executing,
    executeError,
    execute,
    clearExecuteError,
  } = useCallDraw(id);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      await execute();
      setConfirmOpen(false);
    } catch {
      // The error is shown inside the modal; if another administrator ran
      // the draw first, the hook already reloaded the result.
    }
  };

  const closeModal = () => {
    clearExecuteError();
    setConfirmOpen(false);
  };

  if (loading) return <Loading />;

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <div className="page" data-testid="call-draw-page">
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
        <span className="breadcrumb-current">Sorteo de cupos</span>
      </div>

      <div className="page-header">
        <h1>Sorteo de cupos</h1>
        <p>{preview.callTitle}</p>
      </div>

      {result ? (
        <>
          <DrawResult result={result} />

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-primary"
              data-testid="draw-view-results-button"
              onClick={() => navigate(`/admin/calls/${id}/draw/results`)}
            >
              Ver resultados y exportar CSV
            </button>
          </div>
        </>
      ) : (
        <DrawPreview
          preview={preview}
          onExecute={() => setConfirmOpen(true)}
        />
      )}

      <ConfirmDrawModal
        open={confirmOpen && !result}
        preview={preview}
        error={executeError}
        loading={executing}
        onConfirm={handleConfirm}
        onCancel={closeModal}
      />
    </div>
  );
}

function DrawPreview({ preview, onExecute }) {
  const blockingMessage = blockingMessageFor(preview);

  return (
    <div className="form-card draw-section" data-testid="draw-preview">
      <h2 className="form-section-title">Resumen previo al sorteo</h2>

      <div className="summary-table">
        <div className="summary-row">
          <span className="summary-label">Cupos</span>
          <span className="summary-value" data-testid="draw-preview-slots">
            {preview.totalSlots}
          </span>
        </div>

        <div className="summary-row">
          <span className="summary-label">
            Solicitudes aprobadas (participan)
          </span>
          <span className="summary-value" data-testid="draw-preview-approved">
            {preview.approvedCount}
          </span>
        </div>

        {Object.entries(preview.applicationsByStatus)
          .filter(([status]) => status !== "APPROVED")
          .map(([status, total]) => (
            <div className="summary-row" key={status}>
              <span className="summary-label">
                {STATUS_LABELS[status] || status} (no participan)
              </span>
              <span className="summary-value">{total}</span>
            </div>
          ))}
      </div>

      {preview.directAssignment && (
        <div className="info-box" data-testid="draw-direct-assignment-info">
          <span className="info-box-icon" aria-hidden="true">ℹ️</span>
          <span>
            Hay {preview.totalSlots} cupos para {preview.approvedCount}{" "}
            solicitudes aprobadas. No hay competencia: todas quedarán con cupo
            asignado y no habrá lista de espera.
          </span>
        </div>
      )}

      {blockingMessage && (
        <div className="error-msg draw-blocking" data-testid="draw-blocking-error">
          {blockingMessage}
        </div>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-primary"
          data-testid="draw-execute-button"
          disabled={!preview.canExecute}
          onClick={onExecute}
        >
          {preview.directAssignment ? "Asignar cupos" : "Ejecutar sorteo"}
        </button>
      </div>
    </div>
  );
}

function blockingMessageFor(preview) {
  switch (preview.blockingError) {
    case "CALL_NOT_CLOSED":
      return "La convocatoria debe estar cerrada para ejecutar el sorteo. Ciérrela desde la lista de convocatorias.";
    case "APPLICATIONS_PENDING_VALIDATION":
      return `Hay ${preview.unvalidatedCount} solicitudes pendientes de validación. Apruébelas o rechácelas desde Revisar Postulaciones antes de ejecutar el sorteo.`;
    case "NO_APPROVED_APPLICATIONS":
      return "No hay solicitudes aprobadas. Apruebe al menos una para poder asignar los cupos.";
    case null:
    case undefined:
      return null;
    default:
      return "El sorteo no se puede ejecutar en este momento.";
  }
}
