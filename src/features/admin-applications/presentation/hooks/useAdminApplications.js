import { useEffect, useState } from "react";
import { getAdminApplicationsUseCase } from "../../admin.dependencies.js";

export const ADMIN_APPLICATIONS_PAGE_SIZE = 20;

// Presentation hook:
// Loads one page of the admin application list for the given filters.
//
// Same pattern as useAdminCalls: the loader lives inside the effect and a
// refresh key triggers reloads. Responses from a previous request (filters or
// page changed meanwhile) are discarded so they cannot overwrite newer data.
export default function useAdminApplications({
  callId,
  status,
  page = 0,
  size = ADMIN_APPLICATIONS_PAGE_SIZE,
} = {}) {
  const [applications, setApplications] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAdminApplicationsUseCase.execute({
          callId,
          status,
          page,
          size,
        });

        if (ignore) return;

        setApplications(Array.isArray(data?.content) ? data.content : []);
        setTotal(Number(data?.totalElements) || 0);
        setTotalPages(Number(data?.totalPages) || 0);
      } catch (e) {
        if (ignore) return;

        setError(e.message || "No se pudieron cargar las postulaciones");
        setApplications([]);
        setTotal(0);
        setTotalPages(0);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [callId, status, page, size, refreshKey]);

  const reload = () => setRefreshKey((key) => key + 1);

  return {
    applications,
    total,
    totalPages,
    loading,
    error,
    reload,
  };
}
