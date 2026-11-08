import { useState, useCallback } from "react";
import { getDocumentReadUrlUseCase } from "../../admin.dependencies.js";

// Previsualiza un documento de la postulación en una pestaña nueva (D4).
// Se abre la pestaña de forma síncrona en el click para evitar el popup-blocker.
export default function useDocumentReadUrl() {
  const [previewingDocId, setPreviewingDocId] = useState(null);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => setError(null), []);

  const preview = useCallback(async (applicationId, documentId) => {
    const win = window.open("", "_blank");
    setPreviewingDocId(documentId);
    setError(null);
    try {
      const { url } = await getDocumentReadUrlUseCase.execute(applicationId, documentId);
      if (win) win.location = url;
    } catch (e) {
      if (win) win.close();
      setError({
        docId: documentId,
        message:
          e.code === "FILE_NOT_FOUND_IN_S3"
            ? "Archivo no disponible en el bucket"
            : "No se pudo abrir el documento. Intente de nuevo.",
      });
    } finally {
      setPreviewingDocId(null);
    }
  }, []);

  return { preview, previewingDocId, error, clearError };
}
