import { useNavigate } from "react-router-dom";

import {
    Loading,
    ErrorMessage,
} from "../../../../components/UI";

import useApplications from "../hooks/useApplications";
import ApplicationCard from "../components/ApplicationCard";

export default function ApplicationsPage() {
    const navigate = useNavigate();

    // Presentation abstraction:
    // Retrieves application state through the feature hook.
    const {
        applications,
        loading,
        error,
    } = useApplications();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    return (
        <div className="page">
            <div className="page-header">
                <h1>Mis Postulaciones</h1>

                <p>
                    Consulte el estado de sus postulaciones
                    a convocatorias.
                </p>
            </div>

            {applications.length === 0 ? (
                <div className="empty-state">
                    <p>
                        No tiene postulaciones registradas.
                    </p>

                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            navigate("/convocations")
                        }
                    >
                        Ver Convocatorias
                    </button>
                </div>
            ) : (
                <div className="applications-list">
                    {applications.map((application) => (
                        <ApplicationCard
                            key={application.id}
                            application={application}
                            onSelect={() =>
                                navigate(
                                    `/applications/${application.id}`
                                )
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
}