import { useEffect, useState } from "react";
import { getDocumentTypesUseCase } from "../../applications.dependencies";

export default function useDocumentTypes() {
  // Presentation State:
  // Holds the required-document catalog fetched from the backend.
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getDocumentTypesUseCase
      .execute()
      .then((data) => {
        if (!cancelled) {
          setTypes(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("No se pudo cargar el catálogo de documentos.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { types, loading, error };
}
