import { useEffect, useState } from "react";

import {
  getResidentDrawResultsUseCase,
} from "../../convocations.dependencies";

// Presentation hook (CU 1.1.2 D4 · residente):
// carga el listado de resultados del sorteo de una convocatoria y la huella
// de integridad del CSV. Sin acciones de administración.
export default function useResidentDrawResults(callId) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getResidentDrawResultsUseCase.execute(callId);

        if (!cancelled) {
          setResults(data);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError.message ||
              "No se pudieron cargar los resultados del sorteo.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadResults();

    return () => {
      cancelled = true;
    };
  }, [callId, refreshKey]);

  const reload = () => setRefreshKey((key) => key + 1);

  return {
    results,
    loading,
    error,
    reload,
  };
}
