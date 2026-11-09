import { useState } from "react";

export default function AdminRejectModal({ open, application, error, loading, onConfirm, onCancel }) {
  const [reason, setReason] = useState("");

  if (!open) return null;

  return (
    <div className="confirm-modal-overlay" role="presentation">
      <div className="confirm-modal" role="dialog" aria-modal="true" data-testid="admin-reject-modal">
        <h3>Rechazar postulación</h3>
        <p>
          ¿Desea rechazar la postulación <strong>{application.applicationNumber}</strong>?
        </p>
        <p className="confirm-modal-hint">
          Si la postulación estaba aprobada, dejará de participar en el sorteo.
        </p>
        <label className="admin-reject-label" htmlFor="admin-reject-reason">
          Motivo (el residente lo verá en su solicitud)
        </label>
        <textarea
          id="admin-reject-reason"
          className="admin-reject-textarea"
          data-testid="admin-reject-reason-input"
          maxLength={500}
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <p className="confirm-modal-hint">{`${reason.length}/500`}</p>
        {error && <div className="error-msg" data-testid="admin-reject-error">{error}</div>}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="admin-reject-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-danger-solid"
            data-testid="admin-reject-confirm"
            onClick={() => onConfirm(reason)}
            disabled={loading || !reason.trim()}
          >
            {loading ? "Rechazando..." : "Rechazar"}
          </button>
        </div>
      </div>
    </div>
  );
}
