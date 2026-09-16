import ApplicationStatus from "./ApplicationStatus";

// Presentational Component Pattern:
// Renders application detail information.
//
// Single Responsibility Principle:
// Responsible only for application data visualization.
export default function ApplicationDetails({
    application,
}) {
    return (
        <div className="summary-table">
            <SummaryRow
                label="Número"
                value={application.applicationNumber}
                className="teal"
            />

            <SummaryRow
                label="Convocatoria"
                value={application.callTitle}
            />

            <SummaryRow
                label="Residente"
                value={application.residentName}
            />

            <SummaryRow
                label="Apartamento"
                value={application.apartmentNumber}
            />

            <SummaryRow
                label="Fecha Registro"
                value={new Date(
                    application.createdAt
                ).toLocaleDateString("es-CO")}
            />

            <SummaryRow
                label="Estado"
                value={
                    <ApplicationStatus
                        status={application.status}
                    />
                }
            />
        </div>
    );
}

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
                className={`summary-value ${className || ""}`}
            >
                {value}
            </span>
        </div>
    );
}