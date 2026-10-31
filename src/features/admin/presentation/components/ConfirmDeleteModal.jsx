// Presentational Component:
// Confirmation dialog for deleting a call (RN-08: only without applications).
export default function ConfirmDeleteModal({
  open,
  call,
  error = null,
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="confirm-modal-overlay" role="presentation">
      <div
        className="confirm-modal"
        role="dialog"
        aria-modal="true"
        data-testid="admin-delete-modal"
      >
        <h3>Eliminar convocatoria</h3>

        <p>
          ¿Desea eliminar{" "}
          <strong>{call?.title}</strong>? Esta acción no se puede deshacer.
        </p>

        <p className="confirm-modal-hint">
          Solo es posible eliminar convocatorias sin postulaciones.
        </p>

        {error && (
          <div className="error-msg" data-testid="admin-delete-error">
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
            className="btn btn-danger-solid"
            data-testid="admin-delete-confirm"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}
