import { useState } from "react";

import { deleteCallUseCase } from "../../admin.dependencies";

// Presentation hook:
// Wraps the delete action (only allowed without applications) with state.
export default function useDeleteCall() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = async (id) => {
    try {
      setLoading(true);
      setError(null);

      return await deleteCallUseCase.execute(id);
    } catch (deleteError) {
      setError(
        deleteError.message || "No se pudo eliminar la convocatoria.",
      );

      throw deleteError;
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading, error };
}
