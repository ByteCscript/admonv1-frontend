// src/features/auth/presentation/components/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { authRepository } from "../../auth.dependencies";

// Route Guard:
// Prevents access to protected routes without an authenticated session.
export default function ProtectedRoute({ children }) {
    const token = authRepository.getToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}