import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    Loading,
    ErrorMessage,
} from "../../../../components/UI";

import Tooltip from "../../../../components/Tooltip";
import ConvocationInfo from "../components/ConvocationInfo";
import useConvocation from "../hooks/useConvocation";

export default function ConvocationDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

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
                            onClick={() =>
                                navigate(
                                    `/convocations/${id}/apply` /* Pendiente aca hay que seguir la traza toda en ngles a ApplicationPage */
                                )
                            }
                        >
                            Registrar Postulación
                        </button>

                        <Tooltip text="Inicia el formulario de postulación para esta convocatoria. Deberás confirmar tus datos y adjuntar los documentos requeridos antes de enviarla." />
                    </div>
                </div>
            </div>
        </div>
    );
}