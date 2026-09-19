import { useState } from "react";
import { uploadDocumentUseCase } from "../../applications.dependencies";

const MAX_SIZE_BYTES = 2 * 1024 * 1024;

export default function useDocumentUpload() {
  // Presentation State:
  // Manages document upload lifecycle and progress, one slot per document type.
  const [filesByType, setFilesByType] = useState({});

  const setError = (documentType, file, message) => {
    setFilesByType((current) => ({
      ...current,
      [documentType]: {
        id: crypto.randomUUID(),
        documentType,
        name: file.name,
        size: file.size,
        status: "error",
        message,
      },
    }));
  };

  const uploadDocument = async (documentType, file) => {
    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      setError(documentType, file, "Solo se permiten archivos PDF.");
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      setError(
        documentType,
        file,
        "El archivo excede el tamaño máximo permitido de 2MB.",
      );
      return;
    }

    const entry = {
      id: crypto.randomUUID(),
      documentType,
      name: file.name,
      size: file.size,
      progress: 0,
      status: "uploading",
      documentId: null,
    };

    setFilesByType((current) => ({
      ...current,
      [documentType]: entry,
    }));

    try {
      // Use Case Invocation:
      // Delegates document persistence to application layer.
      const document = await uploadDocumentUseCase.execute(
        documentType,
        file,
        (progress) => {
          setFilesByType((current) => {
            const existing = current[documentType];

            if (!existing || existing.id !== entry.id) {
              return current;
            }

            return {
              ...current,
              [documentType]: { ...existing, progress },
            };
          });
        },
      );

      setFilesByType((current) => {
        const existing = current[documentType];

        if (!existing || existing.id !== entry.id) {
          return current;
        }

        return {
          ...current,
          [documentType]: {
            ...existing,
            status: "done",
            progress: 100,
            documentId: document.id,
          },
        };
      });
    } catch (error) {
      setFilesByType((current) => {
        const existing = current[documentType];

        if (!existing || existing.id !== entry.id) {
          return current;
        }

        return {
          ...current,
          [documentType]: {
            ...existing,
            status: "error",
            message: error.message,
          },
        };
      });
    }
  };

  const removeDocument = (documentType) => {
    setFilesByType((current) => {
      const next = { ...current };
      delete next[documentType];
      return next;
    });
  };

  const files = Object.values(filesByType);

  const uploadedDocumentIds = files
    .filter((file) => file.status === "done" && file.documentId)
    .map((file) => file.documentId);

  return {
    filesByType,
    files,
    uploadDocument,
    removeDocument,
    uploadedDocumentIds,
  };
}
