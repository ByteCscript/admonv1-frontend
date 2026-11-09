import { useEffect, useState } from "react";

import {
  getDrawPreviewUseCase,
  executeDrawUseCase,
  getDrawResultUseCase,
} from "../../admin.dependencies";

// Presentation hook (C.U-08 · Ejecutar sorteo de cupos):
// loads the pre-draw summary and, if the call was already drawn, its result
// (FA-03). Exposes the draw execution with its own loading/error state.
//
// Same pattern as useAdminCalls: the loader lives inside the effect and a
// refresh key triggers a reload.
export default function useCallDraw(callId) {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [executing, setExecuting] = useState(false);
  const [executeError, setExecuteError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadDraw = async () => {
      try {
        setLoading(true);
        setError(null);

        const loadedPreview = await getDrawPreviewUseCase.execute(callId);
        const loadedResult = loadedPreview.drawExecuted
          ? await getDrawResultUseCase.execute(callId)
          : null;

        if (!cancelled) {
          setPreview(loadedPreview);
          setResult(loadedResult);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message || "No se pudo cargar el sorteo.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadDraw();

    return () => {
      cancelled = true;
    };
  }, [callId, refreshKey]);

  const reload = () => setRefreshKey((key) => key + 1);

  const execute = async () => {
    try {
      setExecuting(true);
      setExecuteError(null);

      const executed = await executeDrawUseCase.execute(callId);

      setResult(executed);
      setPreview((current) =>
        current
          ? { ...current, drawExecuted: true, canExecute: false }
          : current,
      );

      return executed;
    } catch (drawError) {
      // FE-03: another administrator executed the draw first; show it.
      if (drawError.code === "DRAW_ALREADY_EXECUTED") {
        reload();
      }

      setExecuteError(drawError.message || "No se pudo ejecutar el sorteo.");

      throw drawError;
    } finally {
      setExecuting(false);
    }
  };

  const clearExecuteError = () => setExecuteError(null);

  return {
    preview,
    result,
    loading,
    error,
    executing,
    executeError,
    execute,
    clearExecuteError,
    reload,
  };
}
