import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getApplications } from "../api";
import { StatusBadge, Loading, ErrorMessage } from "../components/UI";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getApplications()
      .then((data) => {
        setApplications(data?.content || []);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudieron cargar las postulaciones.");
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Mis Postulaciones</h1>
        <p>Consulte el estado de sus postulaciones a convocatorias.</p>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <p>No tiene postulaciones registradas.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Ver Convocatorias
          </button>
        </div>
      ) : (
        <div className="applications-list">
          {applications.map((app) => (
            <div
              key={app.id}
              className="application-row"
              onClick={() => navigate(`/postulacion/${app.id}`)}
            >
              <div className="app-row-main">
                <div className="app-row-number">{app.applicationNumber}</div>
                <div className="app-row-call">{app.callTitle}</div>
              </div>
              <div className="app-row-meta">
                <span>{app.apartmentNumber}</span>
                <span>
                  {new Date(app.createdAt).toLocaleDateString("es-CO")}
                </span>
                <StatusBadge status={app.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
