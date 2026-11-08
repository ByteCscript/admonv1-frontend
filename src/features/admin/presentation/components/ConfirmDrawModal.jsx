// Presentational Component:
// Confirmation dialog before executing the slot draw (C.U-08, steps 4-5).
// The draw is final and cannot be repeated (RN-19).
export default function ConfirmDrawModal({
  open,
  preview,
  error = null,
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open || !preview) {
    return null;
  }

  return (
    <div className="confirm-modal-overlay" role="presentation">
      <div
        className="confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="draw-modal-title"
        data-testid="draw-confirm-modal"
      >
        <h3 id="draw-modal-title">Ejecutar sorteo</h3>

        <p>
          Se sortearán <strong>{preview.availableSlots} cupos</strong> entre{" "}
          <strong>{preview.approvedCount} solicitudes aprobadas</strong> de{" "}
          <strong>{preview.callTitle}</strong>.
        </p>

        <p className="confirm-modal-hint">
          El sorteo es definitivo: no se puede repetir y la convocatoria ya no
          podrá reabrirse ni editarse.
        </p>

        {preview.unvalidatedCount > 0 && (
          <p className="confirm-modal-hint">
            {preview.unvalidatedCount} solicitudes sin validar no participarán.
          </p>
        )}

        {error && (
          <div className="error-msg" data-testid="draw-confirm-error">
            {error}
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="btn btn-primary"
            data-testid="draw-confirm-button"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Sorteando..." : "Confirmar sorteo"}
          </button>
        </div>
      </div>
    </div>
  );
}
