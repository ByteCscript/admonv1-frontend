import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useLogin from "../hooks/useLogin";

export default function LoginPage() {
    const navigate = useNavigate();

    const {
        login,
        loading,
        error,
    } = useLogin();

    // Temporary Development Credentials:
    // Preloads the current backend test user for local development.
    const [email, setEmail] =
        useState("residente@test.com");

    const [password, setPassword] =
        useState("123456");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await login({
                email,
                password,
            });

            // Authentication Flow:
            // Redirects after successful authentication.
            navigate("/");
        } catch {
            // Error state is managed by useLogin.
        }
    };

    return (
        <div className="page">
            <div className="form-card">
                <h1>Iniciar Sesión</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Correo electrónico</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                        <label>Contraseña</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />
                    </div>

                    {error && (
                        <p className="error-message">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading
                            ? "Ingresando..."
                            : "Ingresar"}
                    </button>
                </form>
            </div>
        </div>
    );
}