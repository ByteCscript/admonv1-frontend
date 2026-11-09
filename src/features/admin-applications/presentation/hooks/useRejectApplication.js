import { useState, useCallback } from "react";
import { rejectApplicationUseCase } from "../../admin.dependencies.js";

export default function useRejectApplication() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const reject = useCallback(async (id, reason) => {
    try {
      setBusy(true);
      setError(null);
      const result = await rejectApplicationUseCase.execute(id, reason);
      return result;
    } catch (e) {
      setError(e.message || "No se pudo rechazar la postulacion");
      throw e;
    } finally {
      setBusy(false);
    }
  }, []);

  return { reject, busy, error, setError };
}
