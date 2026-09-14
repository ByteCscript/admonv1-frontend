import { useEffect, useState } from "react";
import { getConvocationByIdUseCase } from "../../convocations.dependencies";

export default function useConvocation(id) {
  // Presentation State:
  // Manages view-specific asynchronous state.
  const [convocation, setConvocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const loadConvocation = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use Case invocation:
        // Delegates business operation to application layer.
        const data = await getConvocationByIdUseCase.execute(id);

        setConvocation(data);
      } catch {
        setError("No se pudo cargar la convocatoria.");
      } finally {
        setLoading(false);
      }
    };

    loadConvocation();
  }, [id]);

  return {
    convocation,
    loading,
    error,
  };
}
