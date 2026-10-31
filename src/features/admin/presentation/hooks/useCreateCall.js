import { useState } from "react";

import { createCallUseCase } from "../../admin.dependencies";

// Presentation hook:
// Wraps the create-call use case with loading/error state.
export default function useCreateCall() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      return await createCallUseCase.execute(payload);
    } catch (createError) {
      setError(createError.message || "No se pudo crear la convocatoria.");

      throw createError;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
}
