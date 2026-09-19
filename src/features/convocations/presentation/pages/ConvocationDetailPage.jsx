import {
    useNavigate,
    useParams,
} from "react-router-dom";
import { useState } from "react";
import {
    Loading,
    ErrorMessage,
} from "../../../../components/UI";

import Tooltip from "../../../../components/Tooltip";
import ConvocationInfo from "../components/ConvocationInfo";
import useConvocation from "../hooks/useConvocation";
import { checkApplicationEligibility } from "../../../applications/infrastructure/api/applications.api";


export default function ConvocationDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [applicationMessage, setApplicationMessage] = useState("");
    // Presentation abstraction:
    // Retrieves state through feature-specific hook.
    const {
        convocation,
        loading,
        error,
    } = useConvocation(id);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    if (!convocation) {
        return null;
    }

    const isOpen =
        convocation.availableSlots > 0;

    const handleApplication = async () => {
        try {
            setApplicationMessage("");

            const result = await checkApplicationEligibility(id);

            // Eligible:
            // User can continue with the application process.
            if (result.data?.canApply === true) {
                navigate(`/convocations/${id}/apply`);
                return;
            }

            // Not Eligible:
            // Displays the backend eligibility message.
            if (result.data?.canApply === false) {
                setApplicationMessage(
                    result.message || "Ya tienes una postulación registrada."
                );
            }

        } catch (error) {
            console.error("Error checking application eligibility:", error);

            setApplicationMessage(
                "No fue posible validar la postulación."
            );
        }
    };

    return (
        <div className="page">
            <div className="breadcrumb">
                <span
                    data-testid="breadcrumb-home"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    Inicio
                </span>

                <span className="breadcrumb-sep">
                    &gt;
                </span>

                <span
                    data-testid="breadcrumb-convocations"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                        navigate("/convocations")
                    }
                >
                    Convocatorias
                </span>

                <span className="breadcrumb-sep">
                    &gt;
                </span>

                <span className="breadcrumb-current">
                    {convocation.title}
                </span>
            </div>

            <div className="detail-layout">
                <div>
                    <ConvocationInfo
                        convocation={convocation}
                    />
                </div>

                <div className="sidebar-card">
                    <h2
                        style={{
                            fontSize: 18,
                            fontWeight: 700,
                            marginBottom: 16,
                        }}
                    >
                        Registrar Postulación
                    </h2>

                    <p
                        style={{
                            fontSize: 14,
                            color: "var(--gray-500)",
                            marginBottom: 20,
                            lineHeight: 1.5,
                        }}
                    >
                        Complete el formulario para
                        postularse a esta convocatoria. Se
                        requiere adjuntar los documentos
                        del vehículo solicitados en el
                        siguiente paso.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                        }}
                    >
                        <button
                            data-testid="convocation-register-button"
                            className="btn btn-primary"
                            style={{
                                flex: 1,
                                marginTop: 8,
                            }}
                            disabled={!isOpen}
                            onClick={handleApplication}
                        >
                            Registrar Postulación
                        </button>
                        {applicationMessage && (
                            <p className="error-message">
                                {applicationMessage}
                            </p>
                        )}

                        <Tooltip text="Inicia el formulario de postulación para esta convocatoria. Deberás confirmar tus datos y adjuntar los documentos requeridos antes de enviarla." />
                    </div>
                </div>
            </div>
        </div>
    );
}