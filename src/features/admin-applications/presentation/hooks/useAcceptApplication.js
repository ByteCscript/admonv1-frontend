import { useState, useCallback } from "react";
import { acceptApplicationUseCase } from "../../admin.dependencies.js";

export default function useAcceptApplication() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const accept = useCallback(async (id) => {
    try {
      setBusy(true);
      setError(null);
      const result = await acceptApplicationUseCase.execute(id);
      return result;
    } catch (e) {
      setError(e.message || "No se pudo aprobar la postulacion");
      throw e;
    } finally {
      setBusy(false);
    }
  }, []);

  return { accept, busy, error, setError };
}
