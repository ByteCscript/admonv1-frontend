import { useState } from "react";

import { loginUseCase } from "../../auth.dependencies";

export default function useLogin() {
  // Presentation State:
  // Manages authentication lifecycle.
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const login = async ({ email, password }) => {
    try {
      setLoading(true);
      setError(null);

      // Use Case Invocation:
      // Delegates authentication to the application layer.
      return await loginUseCase.execute({
        email,
        password,
      });
    } catch (error) {
      setError("Correo o contraseña incorrectos.");

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
}
