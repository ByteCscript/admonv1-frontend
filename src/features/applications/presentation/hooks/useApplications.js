import { useEffect, useState } from "react";
import { getApplicationsUseCase } from "../../applications.dependencies";

export default function useApplications({
  residentId,
  page = 0,
  size = 10,
} = {}) {
  // Presentation State:
  // Manages application listing state.
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use Case Invocation:
        // Delegates retrieval to the application layer.
        const data = await getApplicationsUseCase.execute({
          residentId,
          page,
          size,
        });

        setApplications(data?.content || []);
      } catch {
        setError("No se pudieron cargar las postulaciones.");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [residentId, page, size]);

  return {
    applications,
    loading,
    error,
  };
}
