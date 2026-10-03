import { useState } from "react";
import { cancelApplicationUseCase } from "../../applications.dependencies";

export default function useCancelApplication() {
  // Presentation State:
  // Manages application cancellation lifecycle.
  const [canceling, setCanceling] = useState(false);
  const [cancelError, setCancelError] = useState(null);

  const cancelApplication = async (id) => {
    try {
      setCanceling(true);
      setCancelError(null);

      // Use Case Invocation:
      // Delegates cancellation to the application layer.
      const data = await cancelApplicationUseCase.execute(id);

      return data;
    } catch (err) {
      const message = err?.message || "No se pudo cancelar la postulación.";
      setCancelError(message);
      throw err;
    } finally {
      setCanceling(false);
    }
  };

  return {
    cancelApplication,
    canceling,
    cancelError,
    setCancelError,
  };
}
