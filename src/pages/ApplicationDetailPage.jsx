import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApplication } from "../api";
import { StatusBadge, Loading, ErrorMessage } from "../components/UI";

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getApplication(id)
      .then((data) => {
        setApp(data);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudo cargar la postulacion.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!app) return null;

  return (
    <div className="page">
      <div className="breadcrumb">
        <span>Mis Postulaciones</span>
        <span className="breadcrumb-sep">&gt;</span>
        <span className="breadcrumb-current">{app.applicationNumber}</span>
      </div>

      <div className="form-layout">
        <div className="form-card">
          <h2>Detalle de Postulacion</h2>
          <div className="summary-table">
            <SummaryRow
              label="Numero"
              value={app.applicationNumber}
              className="teal"
            />
            <SummaryRow label="Convocatoria" value={app.callTitle} />
            <SummaryRow label="Residente" value={app.residentName} />
            <SummaryRow label="Apartamento" value={app.apartmentNumber} />
            <SummaryRow
              label="Fecha Registro"
              value={new Date(app.createdAt).toLocaleDateString("es-CO")}
            />
            <SummaryRow label="Estado" value={<StatusBadge status={app.status} />} />
          </div>

          {app.documents && app.documents.length > 0 && (
            <>
              <h2 style={{ marginTop: 24 }}>Documentos Adjuntos</h2>
              {app.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="uploaded-file"
                  style={{ marginTop: 12 }}
                >
                  <span className="uploaded-file-icon">📄</span>
                  <div className="uploaded-file-info">
                    <div className="uploaded-file-name">{doc.originalName}</div>
                    <div className="uploaded-file-meta">
                      {(doc.size / 1048576).toFixed(1)} MB
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          <div className="form-actions" style={{ marginTop: 24 }}>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/mis-postulaciones")}
            >
              Volver
            </button>
          </div>
        </div>

        <div className="sidebar-card">
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
            Estado de la Postulacion
          </h2>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <StatusBadge status={app.status} />
            <p
              style={{
                fontSize: 14,
                color: "var(--gray-500)",
                marginTop: 12,
                lineHeight: 1.5,
              }}
            >
              {app.status === "PENDING_VALIDATION" &&
                "Su postulacion esta en proceso de validacion por la administracion."}
              {app.status === "APPROVED" &&
                "Su postulacion ha sido aprobada. Recibira mas instrucciones por correo."}
              {app.status === "REJECTED" &&
                "Su postulacion no fue aprobada. Contacte a administracion para mas informacion."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, className }) {
  return (
    <div className="summary-row">
      <span className="summary-label">{label}</span>
      <span className={`summary-value ${className || ""}`}>{value}</span>
    </div>
  );
}
