// src/features/auth/presentation/components/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { authRepository } from "../../auth.dependencies";

// Route Guard:
// Prevents access to protected routes without an authenticated session.
//
// When `requiredRole` is given, it also blocks users without that role
// (RN-06: only ROLE_ADMIN reaches the administration screens).
export default function ProtectedRoute({ children, requiredRole }) {
    const token = authRepository.getToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole) {
        const session = authRepository.getSession();
        const roles = session?.roles ?? [];

        if (!roles.includes(requiredRole)) {
            return <Navigate to="/" replace />;
        }
    }

    return children;
}
