import { useEffect, useState } from "react";
import { getApplicationByIdUseCase } from "../../applications.dependencies";

export default function useApplication(id) {
  // Presentation State:
  // Manages application detail lifecycle.
  const [application, setApplication] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const loadApplication = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use Case Invocation:
        // Delegates retrieval to the application layer.
        const data = await getApplicationByIdUseCase.execute(id);

        setApplication(data);
      } catch {
        setError("No se pudo cargar la postulación.");
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [id]);

  return {
    application,
    loading,
    error,
  };
}
