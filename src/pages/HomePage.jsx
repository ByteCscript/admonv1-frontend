import { useEffect, useState } from "react";
import { authenticatedFetch } from "../shared/infrastructure/http/authenticatedFetch";

export default function HomePage() {
    const [status, setStatus] = useState("checking");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const checkBackend = async () => {
            try {
                const response = await authenticatedFetch("/api/hola");

                if (!response.ok) {
                    throw new Error();
                }

                const data = await response.text();

                setMessage(data);
                setStatus("connected");
            } catch {
                setStatus("disconnected");
            }
        };

        checkBackend();
    }, []);

    return (
        <div className="page">
            <div className="form-card">
                <h1>Inicio</h1>

                {status === "checking" && (
                    <p>Verificando conexión con el backend...</p>
                )}

                {status === "connected" && (
                    <>
                        <h3>🟢 Backend conectado</h3>
                        <p>{message}</p>
                    </>
                )}

                {status === "disconnected" && (
                    <h3>🔴 Backend no disponible</h3>
                )}
            </div>
        </div>
    );
}