import { useEffect, useState } from "react";

import { getCallsAdminUseCase } from "../../admin.dependencies";

// Presentation hook:
// Loads the call list for the administration screen and exposes a reload().
//
// The loader lives inside the effect (same pattern as useConvocations) and
// a refresh key is what triggers a reload.
export default function useAdminCalls() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const loadCalls = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getCallsAdminUseCase.execute();

        setCalls(Array.isArray(data) ? data : []);
      } catch (loadError) {
        setError(
          loadError.message || "No se pudieron cargar las convocatorias.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadCalls();
  }, [refreshKey]);

  const reload = () => setRefreshKey((key) => key + 1);

  return {
    calls,
    loading,
    error,
    reload,
  };
}
