import { useState } from "react";
import { uploadDocumentUseCase } from "../../applications.dependencies";

export default function useDocumentUpload() {
  // Presentation State:
  // Manages document upload lifecycle and progress.
  const [files, setFiles] = useState([]);

  const uploadDocument = async (file) => {
    if (!file || file.type !== "application/pdf") {
      throw new Error("Solo se permiten archivos PDF.");
    }

    const entry = {
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      progress: 0,
      status: "uploading",
      documentId: null,
    };

    setFiles((current) => [...current, entry]);

    try {
      // Use Case Invocation:
      // Delegates document persistence to application layer.
      const document = await uploadDocumentUseCase.execute(file, (progress) => {
        setFiles((current) =>
          current.map((item) =>
            item.id === entry.id
              ? {
                  ...item,
                  progress,
                }
              : item,
          ),
        );
      });

      setFiles((current) =>
        current.map((item) =>
          item.id === entry.id
            ? {
                ...item,
                status: "done",
                progress: 100,
                documentId: document.id,
              }
            : item,
        ),
      );
    } catch (error) {
      setFiles((current) =>
        current.map((item) =>
          item.id === entry.id
            ? {
                ...item,
                status: "error",
              }
            : item,
        ),
      );

      throw error;
    }
  };

  const removeDocument = (id) => {
    setFiles((current) => current.filter((file) => file.id !== id));
  };

  const uploadedDocumentIds = files
    .filter((file) => file.status === "done" && file.documentId)
    .map((file) => file.documentId);

  return {
    files,
    uploadDocument,
    removeDocument,
    uploadedDocumentIds,
  };
}
