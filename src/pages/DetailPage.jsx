import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCall } from "../api";
import { Loading, ErrorMessage } from "../components/UI";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCall(id)
      .then((data) => {
        setCall(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudo cargar la convocatoria.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!call) return null;

  const isOpen = call.availableSlots > 0;

  return (
    <div className="page">
      <div className="breadcrumb">
        <span>Inicio</span>
        <span className="breadcrumb-sep">&gt;</span>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Convocatorias
        </span>
        <span className="breadcrumb-sep">&gt;</span>
        <span className="breadcrumb-current">{call.title}</span>
      </div>
      <div className="detail-layout">
        <div>
          <span className={`badge ${isOpen ? "badge-open" : "badge-closed"}`}>
            {isOpen ? "Abierta" : "Cerrada"}
          </span>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "var(--gray-900)",
              marginTop: 12,
            }}
          >
            {call.title}
          </h1>

          <h2>Informacion de la Convocatoria</h2>
          <div className="spec-grid">
            <div className="spec-item">
              <div className="spec-label">Cupos Disponibles</div>
              <div className="spec-value">{call.availableSlots}</div>
            </div>
            <div className="spec-item">
              <div className="spec-label">Estado</div>
              <div className="spec-value">{isOpen ? "Abierta" : "Cerrada"}</div>
            </div>
          </div>
        </div>

        <div className="sidebar-card">
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
            Registrar Postulacion
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--gray-500)",
              marginBottom: 20,
              lineHeight: 1.5,
            }}
          >
            Complete el formulario para postularse a esta convocatoria. Se
            requiere adjuntar documento de Paz y Salvo.
          </p>
          <button
            className="btn btn-primary"
            style={{ width: "100%", marginTop: 8 }}
            disabled={!isOpen}
            onClick={() => navigate(`/convocatoria/${id}/postular`)}
          >
            Registrar Postulacion
          </button>
        </div>
      </div>
    </div>
  );
}
