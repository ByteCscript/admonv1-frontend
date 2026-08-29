import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCalls } from "../api";
import { Loading, ErrorMessage } from "../components/UI";

export default function CallsPage() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCalls()
      .then((data) => {
        setCalls(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudieron cargar las convocatorias.");
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1>Convocatorias Disponibles</h1>
            <p>Participe en los sorteos mensuales para el uso de areas comunes.</p>
          </div>
        </div>
      </div>
      <div className="calls-grid">
        {calls.map((c) => (
          <div key={c.id} className="call-card">
            <div className="call-card-body">
              <div className="call-card-meta">
                <span
                  className={`badge ${c.availableSlots > 0 ? "badge-open" : "badge-closed"}`}
                >
                  {c.availableSlots > 0 ? "Abierta" : "Cerrada"}
                </span>
                <span className="call-card-slots">
                  👤 {c.availableSlots} cupos disponibles
                </span>
              </div>
              <div className="call-card-title">{c.title}</div>
              <div className="call-card-footer">
                <button
                  className="btn-card"
                  disabled={c.availableSlots <= 0}
                  onClick={() => navigate(`/convocatoria/${c.id}`)}
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        ))}
        {calls.length === 0 && (
          <p
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              color: "var(--gray-500)",
              padding: 40,
            }}
          >
            No hay convocatorias disponibles.
          </p>
        )}
      </div>
    </div>
  );
}
