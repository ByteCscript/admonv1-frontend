import { useNavigate } from "react-router-dom";

import CallForm from "../components/CallForm";
import useCreateCall from "../hooks/useCreateCall";

// Creation screen for a new call (RN-07 validated in the backend).
export default function CreateCallPage() {
  const navigate = useNavigate();

  const { create, loading, error } = useCreateCall();

  const handleSubmit = async (payload) => {
    try {
      await create(payload);

      navigate("/admin/convocations");
    } catch {
      // Error state is exposed through the hook (shown by CallForm).
    }
  };

  return (
    <div className="page" data-testid="admin-new-call-page">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1>Nueva Convocatoria</h1>
            <p>Defina el periodo y los cupos disponibles de la convocatoria.</p>
          </div>
        </div>
      </div>

      <div className="form-layout admin-form-layout">
        <CallForm
          submitLabel="Crear convocatoria"
          loading={loading}
          error={error}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/convocations")}
        />
      </div>
    </div>
  );
}
