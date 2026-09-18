import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login, loading, error } = useLogin();

    // Temporary Development Credentials:
    // Preloads the current backend test user for local development.
    const [email, setEmail] = useState("residente@test.com");
    const [password, setPassword] = useState("123456");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await login({ email, password });

            // Authentication Flow:
            // Redirects after successful authentication.
            navigate("/");
        } catch {
            // Error state is managed by useLogin.
        }
    };

    return (
        <div className="login-page">

            {/* Branding Section */}
            <section className="login-brand">
                <div className="login-brand-content">
                    <div className="login-logo">🏠</div>

                    <h1>Cheyoung</h1>

                    <p className="login-brand-description">
                        Tu comunidad, organizada en un solo lugar.
                    </p>

                    <div className="login-features">
                        <div>
                            <span>✓</span>
                            Consulta convocatorias disponibles
                        </div>

                        <div>
                            <span>✓</span>
                            Gestiona tus postulaciones
                        </div>

                        <div>
                            <span>✓</span>
                            Mantén tus documentos organizados
                        </div>
                    </div>
                </div>
            </section>

            {/* Authentication Section */}
            <section className="login-section">
                <div className="login-card">
                    <div className="login-header">
                        <span className="login-welcome">BIENVENIDO</span>

                        <h2>Iniciar sesión</h2>

                        <p>
                            Ingresa tus credenciales para acceder a tu cuenta.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">

                        <div className="login-field">
                            <label htmlFor="email">Correo electrónico</label>

                            <div className="login-input-wrapper">
                                <span>✉</span>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="correo@ejemplo.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="login-field">
                            <label htmlFor="password">Contraseña</label>

                            <div className="login-input-wrapper">
                                <span>🔒</span>

                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    placeholder="Ingresa tu contraseña"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="login-error">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? "Ingresando..." : "Ingresar"}
                            {!loading && <span>→</span>}
                        </button>
                    </form>

                    <div className="login-footer">
                        Acceso exclusivo para residentes de Cheyoung
                    </div>
                </div>
            </section>
        </div>
    );
}