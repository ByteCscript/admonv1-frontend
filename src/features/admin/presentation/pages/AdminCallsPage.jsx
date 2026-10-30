import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminCallCard from "../components/AdminCallCard";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import useAdminCalls from "../hooks/useAdminCalls";
import useCloseCall from "../hooks/useCloseCall";
import useReopenCall from "../hooks/useReopenCall";
import useDeleteCall from "../hooks/useDeleteCall";
import { Loading, ErrorMessage } from "../../../../components/UI";

// Administration hub for calls (CU 1.1.4 Publicar convocatoria).
export default function AdminCallsPage() {
  const navigate = useNavigate();

  const { calls, loading, error, reload } = useAdminCalls();
  const { close } = useCloseCall();
  const { reopen } = useReopenCall();
  const { remove } = useDeleteCall();

  const [busyId, setBusyId] = useState(null);
  const [actionError, setActionError] = useState(null);

  const [callToDelete, setCallToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleToggleClose = async (call) => {
    try {
      setBusyId(call.id);
      setActionError(null);

      if (call.closedManually) {
        await reopen(call.id);
      } else {
        await close(call.id);
      }

      await reload();
    } catch (toggleError) {
      setActionError(
        toggleError.message || "No se pudo cambiar el estado de la convocatoria.",
      );
    } finally {
      setBusyId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!callToDelete) {
      return;
    }

    try {
      setDeleting(true);
      setDeleteError(null);

      await remove(callToDelete.id);

      setCallToDelete(null);
      await reload();
    } catch (removeError) {
      setDeleteError(
        removeError.message || "No se pudo eliminar la convocatoria.",
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <div className="page" data-testid="admin-calls-page">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1>Administrar Convocatorias</h1>
            <p>
              Publique, edite, cierre o elimine las convocatorias del conjunto.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            data-testid="admin-new-call-button"
            onClick={() => navigate("/admin/convocations/new")}
          >
            Nueva Convocatoria
          </button>
        </div>
      </div>

      {actionError && (
        <div className="error-msg" data-testid="admin-action-error">
          {actionError}
        </div>
      )}

      <div className="calls-grid">
        {calls.map((call) => (
          <AdminCallCard
            key={call.id}
            call={call}
            busy={busyId === call.id}
            onEdit={() => navigate(`/admin/convocations/${call.id}/edit`)}
            onToggleClose={() => handleToggleClose(call)}
            onDelete={() => {
              setDeleteError(null);
              setCallToDelete(call);
            }}
          />
        ))}

        {calls.length === 0 && (
          <p className="admin-empty">
            No hay convocatorias registradas.
          </p>
        )}
      </div>

      <ConfirmDeleteModal
        open={Boolean(callToDelete)}
        call={callToDelete}
        error={deleteError}
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteError(null);
          setCallToDelete(null);
        }}
      />
    </div>
  );
}
