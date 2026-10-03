import {
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    Loading,
    ErrorMessage,
} from "../../../../components/UI";

import useApplication from "../hooks/useApplication";
import useCancelApplication from "../hooks/useCancelApplication";

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
        setApplication,
        loading,
        error,
    } = useApplication(id);

    // Cancellation flow state (modal + request lifecycle).
    const [showCancelModal, setShowCancelModal] = useState(false);

    const {
        cancelApplication,
        canceling,
        cancelError,
        setCancelError,
    } = useCancelApplication();

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    if (!application) {
        return null;
    }

    // Cancellation is only offered while the application is still registered
    // and the convocation period is open (same rule the backend enforces).
    const isCallPeriodOpen = (() => {
        const { callStartDate, callEndDate } = application;

        // Without call dates the backend remains the source of truth.
        if (!callStartDate || !callEndDate) {
            return true;
        }

        const today = new Date().toLocaleDateString("en-CA", {
            timeZone: "America/Bogota",
        });

        return callStartDate <= today && today <= callEndDate;
    })();

    const isCancellable =
        application.status === "REGISTERED" && isCallPeriodOpen;

    const openCancelModal = () => {
        setCancelError(null);
        setShowCancelModal(true);
    };

    const closeCancelModal = () => {
        if (canceling) {
            return;
        }
        setShowCancelModal(false);
    };

    const confirmCancel = async () => {
        try {
            const updated = await cancelApplication(application.id);

            // The cancel endpoint returns the summary DTO (without documents),
            // so the updated status is merged keeping the loaded detail.
            setApplication((prev) => ({
                ...prev,
                ...(updated || {}),
                status: updated?.status || "CANCELLED",
                documents: prev.documents,
            }));
            setShowCancelModal(false);
        } catch {
            // cancelError already holds the message for the modal.
        }
    };

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
                        Estado de la Solicitud
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

                    {isCancellable && (
                        <button
                            data-testid="application-cancel-button"
                            className="btn btn-card"
                            style={{
                                borderColor: "var(--red-100)",
                                color: "var(--red-500)",
                            }}
                            onClick={openCancelModal}
                        >
                            Cancelar postulación
                        </button>
                    )}
                </div>
            </div>

            {showCancelModal && (
                <div
                    data-testid="application-cancel-modal"
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0, 0, 0, 0.45)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 16,
                        zIndex: 200,
                    }}
                    onClick={closeCancelModal}
                >
                    <div
                        className="form-card"
                        style={{ maxWidth: 440, width: "100%" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>Cancelar postulación</h2>

                        <p
                            style={{
                                fontSize: 14,
                                color: "var(--gray-600)",
                                lineHeight: 1.6,
                                marginBottom: 8,
                            }}
                        >
                            ¿Está seguro de cancelar la postulación{" "}
                            <strong>
                                {application.applicationNumber}
                            </strong>
                            ? Esta acción no se puede deshacer.
                        </p>

                        {cancelError && (
                            <div
                                data-testid="application-cancel-error"
                                className="login-error"
                                style={{ marginTop: 12 }}
                            >
                                {cancelError}
                            </div>
                        )}

                        <div
                            className="form-actions"
                            style={{ marginTop: 20 }}
                        >
                            <button
                                data-testid="application-cancel-close-button"
                                className="btn btn-secondary"
                                disabled={canceling}
                                onClick={closeCancelModal}
                            >
                                Volver
                            </button>

                            <button
                                data-testid="application-cancel-confirm-button"
                                className="btn btn-primary"
                                disabled={canceling}
                                onClick={confirmCancel}
                            >
                                {canceling
                                    ? "Cancelando..."
                                    : "Confirmar cancelación"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
