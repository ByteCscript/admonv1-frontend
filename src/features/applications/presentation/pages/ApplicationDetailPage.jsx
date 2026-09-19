import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    Loading,
    ErrorMessage,
} from "../../../../components/UI";

import useApplication from "../hooks/useApplication";

import ApplicationDetails from "../components/ApplicationDetails";
import ApplicationDocuments from "../components/ApplicationDocuments";
import ApplicationStatus from "../components/ApplicationStatus";

export default function ApplicationDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Presentation abstraction:
    // Retrieves application state through the feature hook.
    const {
        application,
        loading,
        error,
    } = useApplication(id);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    if (!application) {
        return null;
    }

    return (
        <div className="page">
            <div className="breadcrumb">
                <span>Mis Postulaciones</span>

                <span className="breadcrumb-sep">
                    &gt;
                </span>

                <span className="breadcrumb-current">
                    {application.applicationNumber}
                </span>
            </div>

            <div className="form-layout">
                <div className="form-card">
                    <h2>Detalle de Postulación</h2>

                    <ApplicationDetails
                        application={application}
                    />

                    <ApplicationDocuments
                        documents={application.documents}
                    />

                    <div
                        className="form-actions"
                        style={{ marginTop: 24 }}
                    >
                        <button
                            data-testid="application-detail-back-button"
                            className="btn btn-secondary"
                            onClick={() =>
                                navigate("/mis-postulaciones")
                            }
                        >
                            Volver
                        </button>
                    </div>
                </div>

                <div className="sidebar-card">
                    <h2
                        style={{
                            fontSize: 18,
                            fontWeight: 700,
                            marginBottom: 16,
                        }}
                    >
                        Estado de la Postulación
                    </h2>

                    <div
                        style={{
                            textAlign: "center",
                            padding: "20px 0",
                        }}
                    >
                        <ApplicationStatus
                            status={application.status}
                            showMessage
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}