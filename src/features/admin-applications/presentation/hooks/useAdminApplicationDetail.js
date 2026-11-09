import { useState, useEffect, useCallback } from "react";
import { getAdminApplicationDetailUseCase } from "../../admin.dependencies.js";

export default function useAdminApplicationDetail(id) {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const data = await getAdminApplicationDetailUseCase.execute(id);
      setApplication(data);
    } catch (e) {
      setError(e.message || "No se pudo cargar la postulacion");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [id, load]);

  return { application, loading, error };
}
