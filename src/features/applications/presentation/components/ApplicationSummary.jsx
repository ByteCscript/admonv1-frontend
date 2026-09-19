import { RESIDENT } from "../../../../constants";
import ApplicationStepper from "./ApplicationStepper";

// Presentational Component Pattern:
// Renders the completed application summary.
//
// Single Responsibility Principle:
// Responsible only for confirmation and result visualization.
export default function ApplicationSummary({
    result,
    convocation,
    files,
    onFinish,
}) {
    const uploadedFiles = files.filter(
        (file) => file.status === "done"
    );

    return (
        <div className="page">
            <ApplicationStepper current={2} />

            <div className="confirm-layout">
                <div className="form-card">
                    <h2>Resumen de la Solicitud</h2>

                    <div className="summary-table">
                        <SummaryRow
                            label="Convocatoria"
                            value={
                                result.callTitle ||
                                convocation.title
                            }
                        />

                        <SummaryRow
                            label="Número de Postulación"
                            value={result.applicationNumber}
                            className="teal"
                        />

                        <SummaryRow
                            label="Residente"
                            value={
                                result.residentName ||
                                RESIDENT.name
                            }
                        />

                        <SummaryRow
                            label="Apartamento"
                            value={
                                result.apartmentNumber ||
                                RESIDENT.apartment
                            }
                        />

                        <SummaryRow
                            label="Estado"
                            value={
                                <ApplicationStatus
                                    status={result.status}
                                />
                            }
                        />

                        <div className="summary-row">
                            <span className="summary-label">
                                Documentos Adjuntos
                            </span>

                            <span className="summary-value">
                                {uploadedFiles.length === 0 ? (
                                    "N/A"
                                ) : (
                                    <ul
                                        style={{
                                            margin: 0,
                                            paddingLeft: 18,
                                        }}
                                    >
                                        {uploadedFiles.map(
                                            (file) => (
                                                <li
                                                    key={
                                                        file.documentType
                                                    }
                                                    className="summary-doc-link"
                                                >
                                                    {file.name}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="warning-box">
                        <span className="warning-icon">
                            ⚠️
                        </span>

                        <div>
                            <strong>
                                Compromiso de Pago y Convivencia
                            </strong>

                            <br />

                            Al enviar la postulación, acepta el
                            compromiso de pago si es seleccionado
                            en el sorteo. Recuerde respetar el
                            reglamento interno de copropiedad.
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            data-testid="application-summary-finish-button"
                            className="btn btn-primary"
                            onClick={onFinish}
                        >
                            Volver al Inicio
                        </button>
                    </div>
                </div>

                <div className="sidebar-card success-panel">
                    <div className="success-icon">
                        ✓
                    </div>

                    <div className="success-title">
                        ¡Postulación Exitosa!
                    </div>

                    <div className="success-msg">
                        Su registro ha sido procesado de manera
                        correcta.
                    </div>

                    <div className="success-detail">
                        <div className="success-detail-label">
                            Número de Postulación
                        </div>

                        <div className="success-detail-value teal">
                            {result.applicationNumber}
                        </div>
                    </div>

                    <div className="success-detail">
                        <div className="success-detail-label">
                            Estado Inicial
                        </div>

                        <div className="success-detail-value">
                            <ApplicationStatus
                                status={result.status}
                            />
                        </div>
                    </div>

                    <p className="success-note">
                        Se enviará una notificación por correo
                        electrónico con los resultados tras el
                        sorteo.
                    </p>
                </div>
            </div>
        </div>
    );
}

// Presentational Component:
// Standardizes summary field rendering.
function SummaryRow({
    label,
    value,
    className,
}) {
    return (
        <div className="summary-row">
            <span className="summary-label">
                {label}
            </span>

            <span
                className={`summary-value ${className || ""
                    }`}
            >
                {value}
            </span>
        </div>
    );
}

// Presentation Mapper:
// Translates backend status into user-facing representation.
function ApplicationStatus({ status }) {
    const pending =
        status === "PENDING_VALIDATION";

    return (
        <span
            className={`badge ${pending ? "badge-soon" : "badge-open"
                }`}
        >
            {pending
                ? "Pendiente Validación"
                : status}
        </span>
    );
}