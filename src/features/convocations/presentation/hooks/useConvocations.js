import { useEffect, useState } from "react";
import { getConvocationsUseCase } from "../../convocations.dependencies";

export default function useConvocations() {
  // Presentation State Pattern:
  // Encapsula el estado requerido por la vista.
  const [convocations, setConvocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadConvocations = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use Case invocation:
        // La presentación delega la operación a la capa de aplicación.
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
  // Expone a la vista únicamente el estado que necesita.
  return {
    convocations,
    loading,
    error,
  };
}
