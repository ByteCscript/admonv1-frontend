import { useState } from "react";

import { updateCallUseCase } from "../../admin.dependencies";

// Presentation hook:
// Wraps the update-call use case (PUT) with loading/error state.
export default function useUpdateCall() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const update = async (id, payload) => {
    try {
      setLoading(true);
      setError(null);

      return await updateCallUseCase.execute(id, payload);
    } catch (updateError) {
      setError(updateError.message || "No se pudo actualizar la convocatoria.");

      throw updateError;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}
