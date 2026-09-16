import { useState } from "react";
import { createApplicationUseCase } from "../../applications.dependencies";

export default function useCreateApplication() {
  // Presentation State:
  // Manages asynchronous application submission state.
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const createApplication = async (data) => {
    try {
      setSubmitting(true);
      setError(null);

      // Use Case Invocation:
      // Delegates registration to the application layer.
      return await createApplicationUseCase.execute(data);
    } catch (error) {
      setError("Error al registrar la postulación.");
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    createApplication,
    submitting,
    error,
  };
}
