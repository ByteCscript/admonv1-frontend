import { useEffect, useState } from "react";

import { getDrawHashUseCase } from "../../admin.dependencies";

// Presentation hook (CU 1.1.2 D4):
// carga la huella de integridad (SHA-256) del CSV exportado de una convocatoria.
export default function useDrawHash(callId) {
  const [hash, setHash] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadHash = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getDrawHashUseCase.execute(callId);

        if (!cancelled) {
          setHash(data);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message || "No se pudo cargar la huella de integridad.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadHash();

    return () => {
      cancelled = true;
    };
  }, [callId, refreshKey]);

  const reload = () => setRefreshKey((key) => key + 1);

  return {
    hash,
    loading,
    error,
    reload,
  };
}
