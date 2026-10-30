import { useState } from "react";

import { closeCallUseCase } from "../../admin.dependencies";

// Presentation hook:
// Wraps the manual close action (RN-08) with loading/error state.
export default function useCloseCall() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const close = async (id) => {
    try {
      setLoading(true);
      setError(null);

      return await closeCallUseCase.execute(id);
    } catch (closeError) {
      setError(closeError.message || "No se pudo cerrar la convocatoria.");

      throw closeError;
    } finally {
      setLoading(false);
    }
  };

  return { close, loading, error };
}
