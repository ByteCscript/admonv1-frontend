import { authRepository } from "./features/auth/auth.dependencies";

// Datos del residente autenticado, tomados de la sesión (login).
//
// `status` sigue siendo fijo: el backend aún no expone el estado de cuenta
// (paz y salvo) del residente.
export function getCurrentResident() {
  const session = authRepository.getSession();

  return {
    id: session?.userId ?? null,
    name: session?.name || "",
    apartment: session?.apartmentLabel || "—",
    initials: session?.initials || "",
    status: "Paz y Salvo",
  };
}
