import { useNavigate, useParams } from "react-router-dom";

import CallForm from "../components/CallForm";
import useAdminCalls from "../hooks/useAdminCalls";
import useUpdateCall from "../hooks/useUpdateCall";
import { Loading, ErrorMessage } from "../../../../components/UI";

// Edition screen: PUT /api/calls/{id} replaces the whole call (decision D-b).
export default function EditCallPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { calls, loading, error, reload } = useAdminCalls();
  const { update, loading: saving, error: saveError } = useUpdateCall();

  if (loading) return <Loading />;

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  const call = calls.find(
    (item) => String(item.id) === String(id),
  );

  if (!call) {
    return <ErrorMessage>No se encontró la convocatoria.</ErrorMessage>;
  }

  if (call.closedManually) {
    return (
      <ErrorMessage>
        La convocatoria está cerrada y no puede modificarse.
      </ErrorMessage>
    );
  }

  const handleSubmit = async (payload) => {
    try {
      await update(call.id, payload);

      await reload();
      navigate("/admin/convocations");
    } catch {
      // Error state is exposed through the hook (shown by CallForm).
    }
  };

  return (
    <div className="page" data-testid="admin-edit-call-page">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1>Editar Convocatoria</h1>
            <p>{call.title}</p>
          </div>
        </div>
      </div>

      <div className="form-layout admin-form-layout">
        <CallForm
          initialValues={{
            title: call.title ?? "",
            description: call.description ?? "",
            startDate: call.startDate ?? "",
            endDate: call.endDate ?? "",
            availableSlots: call.availableSlots ?? "",
          }}
          submitLabel="Guardar cambios"
          loading={saving}
          error={saveError}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/convocations")}
        />
      </div>
    </div>
  );
}
