import { useState, useEffect, useCallback } from "react";
import { getAdminApplicationsUseCase } from "../../admin.dependencies.js";

export default function useAdminApplications({ callId, status } = {}) {
  const [applications, setApplications] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAdminApplicationsUseCase.execute({
        callId,
        status,
        page: 0,
        size: 50,
      });
      setApplications(Array.isArray(data?.content) ? data.content : []);
      setTotal(Number(data?.totalElements) || 0);
    } catch (e) {
      setError(e.message || "No se pudieron cargar las postulaciones");
      setApplications([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [callId, status]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    applications,
    total,
    loading,
    error,
    reload: load,
  };
}
