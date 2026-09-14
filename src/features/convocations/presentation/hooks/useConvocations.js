import { useEffect, useState } from "react";
import { getConvocationsUseCase } from "../../convocations.dependencies";

export default function useConvocations() {
  // Presentation State Pattern:
  // Encapsulates the state required by the view.
  const [convocations, setConvocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadConvocations = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use Case invocation:
        // The presentation layer delegates the operation to the application layer.
        const data = await getConvocationsUseCase.execute();

        setConvocations(Array.isArray(data) ? data : []);
      } catch {
        setError("No se pudieron cargar las convocatorias.");
      } finally {
        setLoading(false);
      }
    };

    loadConvocations();
  }, []);

  // Facade-like abstraction:
  // It exposes only the state that is needed.
  return {
    convocations,
    loading,
    error,
  };
}
