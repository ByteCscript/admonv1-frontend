import { useState } from "react";

import { reopenCallUseCase } from "../../admin.dependencies";

// Presentation hook:
// Wraps the manual reopen action (RN-08) with loading/error state.
//
// Not listed in the original plan hooks; it exists because ReopenCall is a
// planned use case and the card toggles close/reopen on a single button.
export default function useReopenCall() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reopen = async (id) => {
    try {
      setLoading(true);
      setError(null);

      return await reopenCallUseCase.execute(id);
    } catch (reopenError) {
      setError(reopenError.message || "No se pudo reabrir la convocatoria.");

      throw reopenError;
    } finally {
      setLoading(false);
    }
  };

  return { reopen, loading, error };
}
